import axios from 'axios'
import React from 'react'
import countryData from '../datasets/CI_aggregated.json'
import { classnames } from '../utils/general'
import Tree from '../assets/forest2.png'
import Co2 from '../assets/co2.png'
import Car from '../assets/vehicle.png'

function Home() {

  const scollToRef = React.useRef();

  const [runtime, setRuntime] = React.useState()
  const [cores, setCores] = React.useState()
  const [memory, setMemory] = React.useState()
  const [tdpc, setTdpc] = React.useState()
  const [country, setCountry] = React.useState()
  const [data, setData] = React.useState()
  const [showCarbon, setShowCarbon] = React.useState(false)


  const handleSubmit = (e) => {
    e.preventDefault()
    if (!runtime || !cores || !memory || !tdpc || !country) {
      alert('Please fill out all fields')
      return
    }
    console.log(runtime, cores, memory, tdpc, country)
    setShowCarbon(false)
    // const carbon = (runtime * (TDPC * Number of cores + memory * PM) * PUE * CI of area) / 1000;
    // Pm = 0.375 w/gb  energy consumption per GB of memory
    // pue = 1.67  power usage effectiveness - Energy efficiency of the machine


    axios.post('https://carbon-emmision-api.herokuapp.com/api/calcCarbon', {
      data: {
        runtime,
        cores,
        memory,
        tdpc,
        country
      }
    })
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.log(err)
      })

    // const newCarbon = (runtime * (tdpc * cores + memory * 0.375) * 1.67 * 708.2) / 1000;
    // setCarbon(newCarbon)
    setShowCarbon(true)
    setTimeout(() => {
      scollToRef.current.scrollIntoView({ behavior: 'smooth' })
    }, 500)
  }


  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full mt-10">
        <div className="w-full max-w-md px-4 py-8 bg-white border-0 shadow-2xl shadow-zinc-900 sm:rounded-3xl">
          <h1 className="mb-8 text-2xl font-bold text-center">Carbon Emission</h1>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter runtime in hrs"
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              onChange={(e) => setRuntime(e.target.value)}
              value={runtime}
            />
            <input
              type="text"
              placeholder="Number of cores"
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              onChange={(e) => setCores(e.target.value)}
              value={cores}
            />
            <input
              type="text"
              placeholder="TDP per core of the CPU"
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              onChange={(e) => setTdpc(e.target.value)}
              value={tdpc}
            />
            <input
              type="text"
              placeholder="Memory available in GB"
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              onChange={(e) => setMemory(e.target.value)}
              value={memory}
            />

            {/* Dropdown */}
            <div className="relative inline-block w-full text-gray-700">
              <select
                className='w-full h-10 pl-3 pr-6 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                placeholder="Regular input"
                onChange={(e) => setCountry(e.target.value)}
                value={country}
              >
                {countryData.map((country) => (
                  <option key={country.id} value={country.country}>
                    {country.Region}
                  </option>
                ))}
              </select>
            </div>

            <button
              className={classnames(
                "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                "opacity-100"
              )}
            >
              Calculate
            </button>
          </form>
        </div>
        <div ref={scollToRef}>
          {showCarbon &&
            <>
              <div className='m-10 gap-10 md:flex '>

                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                  <img className="w-full" src={Tree} alt="Tree" />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Tree Month - {data?.treeMonth}</div>
                    <p className="text-gray-700 text-base">
                      Amount of CO2 sequestered by a tree in a month. We use it to measure how long it would take to a mature tree to absorb the CO2 emitted by an algorithm.
                      We use the value of 11 kg CO2/year, which is roughly 1kg CO2/month.
                    </p>
                  </div>
                </div>

                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                  <img className="w-full scale-75" src={Co2} alt="Tree" />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Carbon - {data?.carbon} gCO{<sub>2</sub>}e</div>
                    <p className="text-gray-700 text-base">
                      Carbon dioxide equivalent" (CO2e) measures the global warming potential of a mixture of greenhouse gases.
                      It represents the quantity of CO2 that would have the same impact on global warming as the mix of interest
                      and is used as a standardised unit to assess the environmental impact of human activities.

                    </p>
                  </div>
                </div>

                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                  <img className="w-full scale-75" src={Car} alt="Tree" />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Distance in Car - {data?.distance} km</div>
                    <p className="text-gray-700 text-base">
                      Amount of CO2 emitted by a passenger car for the distance travelled. We use it to calculate how many kilometers a passenger car would have to travel to emit the same amount of CO2 as an algorithm.
                    </p>
                  </div>
                </div>

              </div>
            </>
          }
        </div>
      </div>

    </>
  )
}
// className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">

export default Home
import React from 'react'
import countryData from '../datasets/CI_aggregated.json'
import { classnames } from '../utils/general'

function CarbonEmission() {

  const [runtime, setRuntime] = React.useState()
  const [cores, setCores] = React.useState()
  const [memory, setMemory] = React.useState()
  const [tdpc, setTdpc] = React.useState()
  const [country, setCountry] = React.useState()
  const [carbon, setCarbon] = React.useState()
  const [showCarbon, setShowCarbon] = React.useState(false)


  const handleSubmit = (e) => {
    e.preventDefault()
    if (!runtime || !cores || !memory || !tdpc || !country) { 
      alert('Please fill out all fields')
      return
    }
    setShowCarbon(false)
    // const carbon = (runtime * (TDP + memory * PM) * PUE * CI of area) / 1000;
    // Pm = 0.375 w/gb
    // pue =1.67
    const newCarbon = (runtime * (cores * tdpc + memory * 0.3725) * 1.67 * 708.2) / 1000;
    setCarbon(newCarbon)
    setShowCarbon(true)
  }

  return (
    // Input form
    <>
      <div className="flex flex-col items-center justify-center w-full h-full mt-10">
        <div className="w-full max-w-md px-4 py-8 bg-white border-0 shadow-lg sm:rounded-3xl">
          <h1 className="mb-8 text-2xl font-bold text-center">Carbon Emission</h1>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter runtime in ms"
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
                // className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
                className='w-full h-10 pl-3 pr-6 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                placeholder="Regular input" 
                onChange={(e) => setCountry(e.target.value)}
                value={country}
              >
                {countryData.map((country) => (
                  <option key={country.country} value={country.country}>
                    {country.Region}
                  </option> 
                  ))}
              </select>
            </div>

            <button
              className={classnames(
                "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                "opacity-100"
              )}>
              Calculate
            </button>
          </form>
        </div>
        {showCarbon &&
          <p className="text-xl mt-10 ">
            Carbon Emissions:{" "}
            <span className="font-semibold px-2 py-1 rounded-md bg-gray-100">
              {carbon} gCO{<sub>2</sub>}e
            </span>
          </p>}
      </div>

    </>
  )
}
// className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">

export default CarbonEmission
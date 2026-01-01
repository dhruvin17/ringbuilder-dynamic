export const GlobleVal = () => {

    const shapes = ['Round', 'Oval', 'Cushion', 'Radiant', 'Marquise', 'Princess', 'Asscher', 'Pear', 'Emerald', 'Heart']
    const labs = ['GIA', 'IGI', 'HRD']
    const clarityList = ['SI1', 'VS2', 'VS1', 'VVS2', 'VVS1', 'IF', 'FL']
    const colorList = ['J', 'I', 'H', 'G', 'F', 'E', 'D']
    const cutList = ['Fair', 'Good', 'Very Good', 'Excellent']
    const fluorescenceList = ['Strong', 'Medium', 'Faint', 'None']
    const polishList = ['Fair', 'Good', 'Very Good', 'Excellent']
    const symmertyList = ['Fair', 'Good', 'Very Good', 'Excellent'];

    // product loader 
    const fake_data = [];
    for (let i = 0; i < 20; i++) {
        fake_data.push(<div key={i} className="mb-2 flex animate-pulse flex-col space-y-3 p-[1px]"><div className="w-[100%] bg-gray-300 h-60 lg:h-80"></div><div className="w-[65%] bg-gray-300 h-4"></div><div className="w-[40%] bg-gray-300 h-4"></div></div>)
    }

    const DefaultImageUrl = 'https://cdn.shopify.com/s/files/1/0709/4193/3758/files'

    const BACKEND_URL = "https://diamondbackend-pq1n.onrender.com/api/v1"

    return { shapes, labs, clarityList, colorList, cutList, DefaultImageUrl, fluorescenceList, polishList, symmertyList, fake_data, BACKEND_URL }
}

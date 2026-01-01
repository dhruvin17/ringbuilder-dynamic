import { useState } from 'react'

export const Carat = (props) => {

    return (
        <div  className="p-[5%]">
            <h2 className="text-[black] font-bold ">Karat</h2>
            <hr className="!m-0 !my-2"></hr>
            <p className='text-sm sm:text-2xl'>Międzynarodowa jednostka masy stosowana do diamentów i kamieni szlachetnych. 1 karat = 200 mg, czyli 0,2 g.</p>
        </div>
    )
}

export const Color = (props) => {

    let [Color2, setColor] = useState("1")
    function Showdiv(a) {
        setColor(a)
    }
    let state = { 1: 'D', 2: 'E', 3: 'F', 4: 'G', 5: 'H', 6: 'I', 7: 'J', 8: 'K-Z' };
    let arr = ["1", "2", "3", "4", "5", "6", "7", "8"];

    let z = arr.map(el => <li className={`cursor-pointer inline-block w-[22%] text-center m-[1.5%] !leading-[40px] text-xs sm:text-base ${Color2 === `${el}` ? "bg-[#dddddd]" : "bg-[#efefef]"}`} key={el} onClick={() => Showdiv(`${el}`)}>{state[el]}</li>)


    return (
        <div className="p-[5%]">
            <h2 className="text-[black] font-bold my-[5px] ml-[5px]">Barwa diamentu</h2>
            <hr className="!m-0 !my-2"></hr>
            <div className="py-[6px] mb-[6px] bg-[#efefef] text-[14px] font-bold">Wybierz barwę:</div>
            <ul>
                {z}
            </ul>
            {Color2 === "1" && <p className='text-sm sm:text-2xl'><strong>D Barwa:</strong> najwyższy stopień barwy, wyjątkowo rzadki diament uznawany za całkowicie bezbarwny.</p>}
            {Color2 === "2" && <p className='text-sm sm:text-2xl'><strong>E Barwa:</strong> niemal całkowicie bezbarwny diament – minimalne zabarwienie wykrywalne tylko przez gemmologa. Rzadko spotykana barwa.</p>}
            {Color2 === "3" && <p className='text-sm sm:text-2xl'><strong>F Barwa:</strong> nadal uznawana za bezbarwną, z ledwie zauważalnym odcieniem. Diament wysokiej jakości.</p>}
            {Color2 === "4" && <p className='text-sm sm:text-2xl'><strong>G Barwa:</strong> diament wysokiej jakości, prawie bezbarwny.</p>}
            {Color2 === "5" && <p className='text-sm sm:text-2xl'><strong>H Barwa:</strong> diament wysokiej jakości, prawie bezbarwny.</p>}
            {Color2 === "6" && <p className='text-sm sm:text-2xl'><strong>I Barwa:</strong>  delikatny odcień koloru, uznawana za świetny wybór jakości do ceny.</p>}
            {Color2 === "7" && <p className='text-sm sm:text-2xl'><strong>J Barwa:</strong> nieco bardziej zauważalny odcień, ceniona za bardzo dobry stosunek jakości do ceny.</p>}
            {Color2 === "8" && <p className='text-sm sm:text-2xl'><strong>K-Z Barwa:</strong> diamenty mogą mieć żółtawy lub lekko brązowy odcień – w zależności od stopnia barwy.</p>}
        </div>
    )
}

export const Clarity = (props) => {

    let [Color2, setColor] = useState("1")

    function Showdiv(a) {
        setColor(a)
    }

    let state = { 1: 'F', 2: 'IF', 3: 'VVS1-', 4: 'VS1-VS2', 5: 'SI1-SI2', 6: 'I1' };
    let arr = ["1", "2", "3", "4", "5", "6"];

    let z = arr.map(el => <li className={`cursor-pointer inline-block w-[30%] text-center m-[1.5%] !leading-[40px] text-xs sm:text-base ${Color2 === `${el}` ? "bg-[#dddddd]" : "bg-[#efefef]"}`} key={el} onClick={() => Showdiv(`${el}`)}>{state[el]}</li>)

    return (

        <div className="p-[5%]">
            <h2 className="text-[black] font-bold my-[5px] ml-[5px]">Czystość diamentu</h2>
            <hr className="!m-0 !my-2"></hr>
            <div className="py-[6px] mb-[6px] bg-[#efefef] text-[14px] font-bold">Wybierz czystość:</div>
            <ul>
                {z}
            </ul>
            {Color2 === "1" && <p className='text-sm sm:text-2xl'><strong>Flawless: </strong>Flawless: Bez wewnętrznych i zewnętrznych skaz. Diament ekstremalnie rzadki.</p>}
            {Color2 === "2" && <p className='text-sm sm:text-2xl'><strong>Internally Flawless: </strong>Internally Flawless: bez wewnętrznych skaz, z drobnymi niedoskonałościami powierzchniowymi.</p>}
            {Color2 === "3" && <p className='text-sm sm:text-2xl'><strong>VVS1-VVS2: </strong>Bardzo, bardzo drobne inkluzje – trudne do dostrzeżenia pod lupą 10x nawet dla specjalisty.</p>}
            {Color2 === "4" && <p className='text-sm sm:text-2xl'><strong>VS1-VS2: </strong>Bardzo drobne inkluzje widoczne tylko pod lupą 10x.</p>}
            {Color2 === "5" && <p className='text-sm sm:text-2xl'><strong>SI1-SI2: </strong> Drobne inkluzje łatwiejsze do zauważenia pod lupą 10x.</p>}
            {Color2 === "6" && <p className='text-sm sm:text-2xl'><strong>I: </strong> Widoczne inkluzje – mogą być zauważalne gołym okiem.</p>}
        </div>
    )
}

export const Cut = (props) => {

    let [Color2, setColor] = useState("1")

    function Showdiv(a) {
        setColor(a)
    }

    let state = { 1: 'Excellent', 2: 'Very Good', 3: 'Good', 4: 'Fair' };
    let arr = ["1", "2", "3", "4"];

    let z = arr.map(el => <li className={`cursor-pointer inline-block sm:w-1/3 w-[47%] text-[12px] text-center m-[1.5%] leading-[40px] ${Color2 === `${el}` ? "bg-[#dddddd]" : "bg-[#efefef]"}`} key={el} onClick={() => Showdiv(`${el}`)}>{state[el]}</li>)

    return (
        <div className="p-[5%] ">
            <h2 className="text-[black] font-bold my-[5px] ml-[5px]">Szlif diamentu</h2>
            <hr className="!m-0 !my-2"></hr>
            <div className="py-[6px] mb-[6px] bg-[#efefef] text-[14px] font-bold">Wybierz jakość szlifu:</div>

            <ul>
                {z}
            </ul>
            {Color2 === "1" && <p className='text-sm sm:text-2xl'><strong>Excellent cut: </strong> Szlif Excellent odbija najwięcej światła i oznacza diament o wyjątkowej jakości.</p>}
            {Color2 === "2" && <p className='text-sm sm:text-2xl'><strong>Very Good cut: </strong>Szlif Very Good odbija większość światła i jest ceniony za świetny stosunek jakości do ceny.</p>}
            {Color2 === "3" && <p className='text-sm sm:text-2xl'><strong>Good cut: </strong>Szlif Good odbija sporą ilość światła, choć nieco mniej niż szlif Very Good.</p>}
            {Color2 === "4" && <p className='text-sm sm:text-2xl'><strong>Fair cut: </strong>Szlif Fair nie jest ani szczególnie dobry, ani szczególnie słaby – uznawany za przeciętny.</p>}
        </div>
    )
}


export const Polish = (props) => {
    let [Color2, setColor] = useState("1")

    function Showdiv(a) {
        setColor(a)
    }

    let state = { 1: 'Excellent', 2: 'Very Good', 3: 'Good', 4: 'Fair' };
    let arr = ["1", "2", "3", "4"];

    let z = arr.map(el => <li className={`cursor-pointer inline-block sm:w-[22%] w-[47%] text-[12px] text-center m-[1.5%] leading-[40px] ${Color2 === `${el}` ? "bg-[#dddddd]" : "bg-[#efefef]"}`} key={el} onClick={() => Showdiv(`${el}`)}>{state[el]}</li>)
    return (
        <div className="p-[5%]">
            <h2 className="text-[black] font-bold my-[5px] ml-[5px]">Polish</h2>
            <hr className="!m-0 !my-2"></hr>
            {/* <p className='text-sm sm:text-2xl'>The overall condition of a finished diamond's faceted surfaces, including how smoothly the facets have been polished, whether any marks are visible from the polishing wheel, and how defined the edges of each facet are. Polish marks are almost always invisible to the unaided eye, but good polish is essential for maximum light performance.</p> */}
            <div className="py-[6px] mb-[6px] bg-[#efefef] text-[14px] font-bold">Choose a Polish:</div>

            <ul>
                {z}
            </ul>
            {Color2 === "1" && <p className='text-sm sm:text-2xl'><strong>Excellent Polish: </strong>  ranges from no polish features to a few minute polish features that can be viewed with difficulty face-up at 10X magnification.</p>}
            {Color2 === "2" && <p className='text-sm sm:text-2xl'><strong>Very Good Polish: </strong>minor polish features are seen face-up at 10X magnification.</p>}
            {Color2 === "3" && <p className='text-sm sm:text-2xl'><strong>Good Polish: </strong>noticeable polish features are seen face-up at 10X magnification. The luster of the diamond may be affected when viewed with the unaided eye.</p>}
            {Color2 === "4" && <p className='text-sm sm:text-2xl'><strong>Fair Polish: </strong>obvious heavy polish features are seen face-up at 10X magnification. The luster of the diamond is affected when viewed with the unaided eye.</p>}
        </div>
    )
}

export const Percentage = (props) => {
    return (
        <div className="p-[5%]">
            <h2 className="text-[black] font-bold my-[5px] ml-[5px]">Depth Percentage</h2>
            <hr className="!m-0 !my-2"></hr>
            <p className='text-sm sm:text-2xl'>The height of a diamond, measured from the culet to the table, divided by its average girdle diameter. One of the basic proportions that contributes to a diamond's appearance, brilliance and fire.</p>
        </div>
    )
}

export const Table = (props) => {
    return (
        <div className="p-[5%]">
            <h2 className="text-[black] font-bold my-[5px] ml-[5px]">Table Percentage</h2>
            <hr className="!m-0 !my-2"></hr>
            <p className='text-sm sm:text-2xl'>The width of the diamond's table expressed as a percentage of its average diameter. A component of the overall cut grade, this measurement is critical to a diamond's light performance.</p>
        </div>
    )
}


export const Symmetry = (props) => {
    let [Color2, setColor] = useState("1")

    function Showdiv(a) {
        setColor(a)
    }

    let state = { 1: 'Excellent', 2: 'Very Good', 3: 'Good', 4: 'Fair' };
    let arr = ["1", "2", "3", "4"];

    let z = arr.map(el => <li className={`cursor-pointer inline-block sm:w-[22%] w-[47%] text-[12px] text-center m-[1.5%] leading-[40px] ${Color2 === `${el}` ? "bg-[#dddddd]" : "bg-[#efefef]"}`} key={el} onClick={() => Showdiv(`${el}`)}>{state[el]}</li>)
    return (

        <div className="p-[5%]">
            <h2 className="text-[black] font-bold my-[5px] ml-[5px]">Symmetry</h2>
            <hr className="!m-0 !my-2"></hr>
            {/* <p className='text-sm sm:text-2xl'>The overall condition of a finished diamond's faceted surfaces, including how smoothly the facets have been polished, whether any marks are visible from the polishing wheel, and how defined the edges of each facet are. Polish marks are almost always invisible to the unaided eye, but good polish is essential for maximum light performance.</p> */}
            <div className="py-[6px] mb-[6px] bg-[#efefef] text-[14px] font-bold">Choose a Symmetry:</div>

            <ul>
                {z}
            </ul>
            {Color2 === "1" && <p className='text-sm sm:text-2xl'><strong>Excellent Symmetry: </strong> ranges from no symmetry features to minute symmetry features that can be viewed with difficulty face-up at 10X magnification.</p>}
            {Color2 === "2" && <p className='text-sm sm:text-2xl'><strong>Very Good Symmetry: </strong>Minor symmetry features are seen face-up at 10X magnification.</p>}
            {Color2 === "3" && <p className='text-sm sm:text-2xl'><strong>Good Symmetry: </strong>Noticeable symmetry features are seen face-up at 10X magnification. The diamond’s overall appearance may be affected when viewed with the unaided eye.</p>}
            {Color2 === "4" && <p className='text-sm sm:text-2xl'><strong>Fair Symmetry: </strong> Obvious symmetry features are seen face-up at 10X magnification. The diamond’s overall appearance is often affected when viewed with the unaided eye.</p>}
        </div>
    )
}

export const Fluorescence = (props) => {
    return (
        <div className="p-[5%]">
            <h2 className="text-[black] font-bold my-[5px] ml-[5px]">Fluorescence</h2>
            <hr className="!m-0 !my-2"></hr>
            <p className='text-sm sm:text-2xl'>A measure of the visible light some diamonds emit when exposed to ultraviolet (UV) rays. Diamonds with a strong or very strong fluorescence are a better value because the market prices them slightly lower. It is quite rare for fluorescence to have any visual impact on a diamond's appearance, and it does not compromise the gem's structural integrity in any way.</p>
        </div>
    )
}

export const Girdle = (props) => {
    return (
        <div className="p-[5%]">
            <h2 className="text-[black] font-bold my-[5px] ml-[5px]">Girdle</h2>
            <hr className="!m-0 !my-2"></hr>
            <p className='text-sm sm:text-2xl'>Where the crown and pavilion meet, defining the diamond's outline. Avoid extremely thin girdles, which can make a diamond more prone to damage, or extremely thick, which can cause the diamond to look smaller than diamonds of similar weight.</p>
        </div>
    )
}

export const Culet = (props) => {
    return (
        <div className="p-[5%]">
            <h2 className="text-[black] font-bold my-[5px] ml-[5px]">Culet</h2>
            <hr className="!m-0 !my-2"></hr>
            <p className='text-sm sm:text-2xl'>The facet or point at the bottom of a diamond pavilion. In preferred diamond cut grades, culets are generally undetectable to the unaided eye and graded none to small. Medium to large culets may have an impact on light performance.</p>
        </div>
    )
}

export const PriceInfo = (props) => {
    return (
        <div className="p-[5%]">
            <h2 className="text-[black] font-bold  ml-[5px]">Duty/Tax</h2>
            <hr className="!m-0 !my-2"></hr>
            <p className='text-sm sm:text-2xl'>International shipments can be processed online. Customs processes, local taxes and import duties are the responsibility of the customer; please check with your local customs office for information.</p>
            <p className='text-sm sm:text-2xl'>For orders shipped to the UK, we collect the VAT for each order during the checkout.</p>
        </div>
    )
}

export const LabInfo = (props) => {
    return (
        <div className="p-[5%]">
            <h2 className="text-[black] font-bold my-[5px] ml-[5px]">Lab Created Diamonds</h2>
            <hr className="!m-0 !my-2"></hr>
            <p className='text-sm sm:text-2xl'>Lab-grown diamonds are composed of the same chemical composition as natural diamonds. They have the same properties as mined diamonds. Lab-grown diamonds are rapidly becoming the default choice making a more conscious and responsible choice for the Earth in general.</p>
        </div>
    )
}


export const Depth = (props) => {  
    return(
        <div className="p-[5%]">
        <h2 className="text-[black] font-bold my-[5px] ml-[5px]">Depth percentage</h2>
        <hr className="!m-0 !my-2"></hr>
        <p className='text-sm sm:text-2xl'>The height of a diamond, measured from the culet to the table, divided by its average girdle diameter. One of the basic proportions that contributes to a diamond's appearance, brilliance and fire.</p>
    </div>
    )
 }
import { useEffect } from "react"

const Scroll = () => {
    useEffect(() => {
        // document.getElementsByClassName("fakebox")[0].scrollTo(0, 0)
        window.scrollTo(0, 0)
    }, [])

    return null;
}

export default Scroll
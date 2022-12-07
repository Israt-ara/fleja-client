import { useEffect } from "react"

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} - fleja`;
    }, [title])
};

export default useTitle;
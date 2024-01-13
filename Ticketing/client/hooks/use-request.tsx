import axios from "axios";
import { ReactElement, useEffect, useState } from "react";

type responseRequest = {
    response: {
        data: {
            errors: { message: string }[]
        }
    }

}

type UseRequest = {
    url: string
    method: "head" | "options" | "put" | "post" | "patch" | "delete" | "get"
    body?: object
}

type UseRequestResponse = {
    doRequest: () => Promise<any>
    errors: responseRequest | null
}

export default ({ url, method, body }: UseRequest): UseRequestResponse => {

    const [errors, setErrors] = useState<null | responseRequest>(null);
    useEffect(() => {
        if (errors) {
            setTimeout(() => {
                setErrors(null)
            }, 5000);
        }
    }, [errors])
    const doRequest = async () => {
        try {
            setErrors(null)

            const response = await axios[method](url, body)
            return response
        } catch (error) {
            setErrors(error as responseRequest)
            throw error
        }
    }


    return { doRequest, errors }
}
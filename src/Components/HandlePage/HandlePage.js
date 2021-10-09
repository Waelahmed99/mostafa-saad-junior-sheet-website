import React, { useState, useEffect } from "react";
import './styles.css'
import { extractSubmissions } from '../../Services/ExtractSubmissions'
import Loading from '../Loading'
import NoHandle from './NoHandle'
import { useHistory } from "react-router-dom";
import { fetchSubmissions } from "../../Services/FetchSubmissions";

const responseType = { LOADING: "loading", PASSED: "Passed", ERROR: "Error" }

function HandlePage({ match }) {
    const [submissions, setSubmissions] = useState(null)
    const [response, setResponse] = useState(responseType.LOADING)
    const handle = match.params.handle
    const history = useHistory()

    /*
        Fetch data on page load.
        Pass data to [submissions]
    */
    useEffect(() => {
        async function apiCall() {
            if (response === responseType.LOADING) {
                const CodeforcesRequest = await fetchSubmissions(handle)
                if (CodeforcesRequest.status === 'FAILED')
                    setResponse(responseType.ERROR)
                else {
                    setResponse(responseType.PASSED)
                    setSubmissions(extractSubmissions(CodeforcesRequest.result))
                }
            }
        }
        apiCall()
    }, [handle, response, submissions])


    /*
        Navigate to /feed
        after fetching data.
    */
    useEffect(() => {

        if (response === responseType.PASSED && submissions != null)
            history.push({
                pathname: `/${handle}/feed`, state: { handle: handle, submissions: submissions }
            });


    }, [submissions, handle, history, response])

    return (response === responseType.ERROR) ? <NoHandle /> : <Loading />
}

export default HandlePage
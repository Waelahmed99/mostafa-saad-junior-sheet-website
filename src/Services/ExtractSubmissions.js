function extractSubmissions(submissions) {
    submissions.reverse()

    let submissionsList = new Map()
    submissions.forEach(element => {
        const el = new Submission(element)
        const key = (el.contestId + el.index)
        if (submissionsList.has(key)) {
            const insertedSubmission = submissionsList.get(key)
            const currentVerdict = insertedSubmission.verdict

            if (currentVerdict !== verdicts.ACCEPTED && el.verdict !== verdicts.ACCEPTED)
                insertedSubmission.count += 1
            el.count = insertedSubmission.count
            if (currentVerdict !== verdicts.ACCEPTED)
                submissionsList.set(key, el)
            else
                submissionsList.set(key, insertedSubmission)
        } else
            submissionsList.set(key, el)

    });

    return submissionsList
}

const verdicts = {
    ACCEPTED: "Accepted",
    WRONG_ANSWER: "Wrong answer",
    TIME_LIMIT: "Time limit exceeded",
    MEMORY_LIMIT: "Memory limit exceeded",
    RUNTIME: "Runtime error",
    COMPILATION: "Compilation error",
    NOT_TRIED: "Not tried",
}

class Submission {
    constructor(submission) {
        this.name = submission.problem.name
        this.index = submission.problem.index
        this.contestId = submission.contestId
        this.verdict = this.getVerdict(submission.verdict)
        this.count = (this.verdict !== verdicts.ACCEPTED ? 1 : 0)
    }

    getVerdict(verdict) {
        switch (verdict) {
            case "OK":
                return verdicts.ACCEPTED
            case "COMPILATION_ERROR":
                return verdicts.COMPILATION
            case "RUNTIME_ERROR":
                return verdicts.RUNTIME
            case "WRONG_ANSWER":
                return verdicts.WRONG_ANSWER
            case "TIME_LIMIT_EXCEEDED":
                return verdicts.TIME_LIMIT
            case "MEMORY_LIMIT_EXCEEDED":
                return verdicts.MEMORY_LIMIT
            default:
                return verdicts.WRONG_ANSWER
        }
    }

    preview() {
        console.log(this.name + " " + this.index + " " + this.contestId + " " + this.verdict)
    }
}

export { extractSubmissions, verdicts }
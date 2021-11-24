navigator.mediaDevices.getUserMedia({audio: true})
    .then(stream => {
        const mediaRecorder = new MediaRecorder(stream)
        let audioChunks = []

        document.getElementById("startMessage").addEventListener("click", (ev) => {
            mediaRecorder.start()
        });

        document.getElementById("stopMessage").addEventListener("click", (ev) => {
            mediaRecorder.stop()
        })

        mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data)
        });

        mediaRecorder.addEventListener("stop", (ev) => {
            const audioBlob = new Blob(audioChunks, {"type": "audio/mp3;"})
            const audioUrl = URL.createObjectURL(audioBlob)
            audioChunks = []
            const audioElm = document.createElement("audio")
            audioElm.src = audioUrl
            audioElm.controls = true
            audioElm.style = "margin-left: 200px;"
            document.body.appendChild(audioElm)
            document.body.appendChild(document.createElement("br"))
        });
    })

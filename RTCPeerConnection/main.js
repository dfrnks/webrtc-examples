const configuration = {
    iceServers: [
        {
            "urls":[
                "stun:stun.l.google.com:19302"
            ]
        }
    ]
};

var pc1 = new RTCPeerConnection(configuration);
var pc2 = new RTCPeerConnection(configuration);

pc1.createDataChannel('sendDataChannel')
//pc2.createDataChannel('sendDataChannel')

pc1.createOffer().then(function(offer) {
    return pc1.setLocalDescription(offer);
});

pc2.createOffer().then(function(offer) {
    return pc2.setLocalDescription(offer);
});

pc1.onicecandidate = (event) => {
    if (event.candidate) {
        console.log(event)
        pc2.addIceCandidate(event.candidate)
    } else {
        /* there are no more candidates coming during this negotiation */
    }
}

pc2.onicecandidate = (event) => {
    if (event.candidate) {
        //pc1.addIceCandidate(event.candidate)
    } else {
        /* there are no more candidates coming during this negotiation */
    }
}


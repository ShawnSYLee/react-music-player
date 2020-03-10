import { useContext, useEffect } from 'react';

const useCloud = () => {

    
    function handleUpload(e) {
        const file = e.target.files[0];

        const musicRef = firebase.storage().ref('music/' + file.name);

        musicRef.put(file).then(() => {
            const storageRef = firebase.storage().ref('/music');

            storageRef.child(file.name).getMetadata().then(metadata => {
                const url = metadata.downloadURLs[0];
                const messageRef = firebase.database().ref('message');
                messageRef.push({
                    song: url,
                    songName: file.name
                })
            })
        })
    }

    <div>
        <input type="file" ref={(ref) => this.upload = ref} style={{ display: 'none' }} />
        <button>
            className="btn-upload"
            onClick={(e) => this.upload.click()}
        </button>
    </div>
}


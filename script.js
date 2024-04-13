document.addEventListener('DOMContentLoaded', function() {
    let imageInput = document.querySelector(".image");
    let songNameInput = document.querySelector(".song-name");
    let artistInput = document.querySelector(".artist");
    let songLinkInput = document.querySelector(".song-link");
    let uploadButton = document.getElementById('uploadButton');
    let imageUpload = document.getElementById('imageUpload');
    let add = document.querySelector(".add");
    let displayImage = document.querySelector(".display-image");
    let displaySong = document.querySelector(".display-song");
    let displayArtist = document.querySelector(".display-artist");
    let displayLink = document.querySelector(".display-link");
    let uploadedImageUrl = ''; // Variable to store the uploaded image URL or base64 string

    // Function to trigger the file input when the upload button is clicked
    uploadButton.addEventListener('click', function() {
        imageUpload.click();
    });

    // Function to handle the file input change event
  imageUpload.addEventListener('change', function() {
      if (this.files && this.files[0]) {
          const file = this.files[0];
          const objectURL = URL.createObjectURL(file);

          // Display the image preview using the object URL
          imageInput.value = objectURL; // You might want to use a different method to display this URL or the image itself

          // Optionally, display the image in an <img> tag for preview
          const imagePreview = document.getElementById('imagePreview'); // Make sure you have this <img> element in your HTML
          imagePreview.src = objectURL;
          // imagePreview.style.display = 'block';

          // Store the object URL if you need to use it later, but consider privacy and memory cleanup
          uploadedImageUrl = objectURL; // Be mindful about when to revoke these URLs to free memory
      }
  });



    // Function to add the song information along with the uploaded image
  function addSongInfo() {
      // Retrieve input values
      let imageUrl = imageInput.value; // Assuming this is the base64 string or object URL from the file input
      let song = songNameInput.value;
      let artist = artistInput.value;
      let link = songLinkInput.value;

      // Validate inputs
      if (!imageUrl || !song || !artist || !link) {
          alert("Please fill in all fields before adding a song.");
          return; // Exit the function to prevent adding an incomplete song
      }

      // Checks if the link is a YouTube link and converts it to an embed link
      if (isYouTubeLink(link)) {
          link = convertToEmbed(link);
      }

      // Proceed to create the song object and display it
      let newSong = {
          imageUrl: imageUrl,
          song: song,
          artist: artist,
          link: link
      };

      // Clear input fields after adding the song
      clearInputs();

      // Add song to the display
      displaySongInfo(newSong);
  }

  function clearInputs() {
      imageInput.value = "";
      songNameInput.value = "";
      artistInput.value = "";
      songLinkInput.value = "";
      // Ensure you clear the uploadedImageUrl if you're using it
      uploadedImageUrl = ''; // Clear if using object URLs or base64 strings
  }

    // Function to check if the link is a YouTube link
    function isYouTubeLink(link) {
        return link.includes("youtube.com") || link.includes("youtu.be");
    }

    // Function to convert a YouTube link to an embeddable URL
    function convertToEmbed(link) {
        let videoId = link.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId[1]}`;
        }
        return link; // Return the original link if it's not a YouTube link
    }

    // Function to display the song information in the playlist
      function displaySongInfo(newSong) {
      displayImage.innerHTML += `<p><img src="${newSong.imageUrl}" alt="Song Image"></p>`;
        displaySong.innerHTML += `<p>${newSong.song}</p>`;
        displayArtist.innerHTML += `<p>${newSong.artist}</p>`;
        displayLink.innerHTML += `<p><iframe width="300" height="100" src="${newSong.link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></p>`;
    }

    // Event listener to add songs when the add button is clicked
    add.addEventListener('click', addSongInfo);



  const introArrow = document.querySelector('#intro i');
  const playlist = document.querySelector('.playlist');

  introArrow.addEventListener('click', function() {
      playlist.scrollIntoView({ behavior: 'smooth' });
    });
  
});

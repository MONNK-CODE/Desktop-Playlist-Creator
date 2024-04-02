

// input variables
let imageInput = document.querySelector(".image");
let songNameInput = document.querySelector(".song-name");
let artistInput = document.querySelector(".artist");
let songLinkInput = document.querySelector(".song-link");

// button variable
let add = document.querySelector(".add");



// these are display variables
let display = document.querySelector(".display");
let displaySong = document.querySelector(".display-song");
let displayArtist = document.querySelector(".display-artist");
let displayImage = document.querySelector(".display-image");
let displayLink = document.querySelector(".display-link");



// this is a function to add the song information
function addSongInfo() {

  // this declares the variables to save the users input
  let imageUrl = imageInput.value;
  let song = songNameInput.value;
  let artist = artistInput.value;
  let link = songLinkInput.value;

  // this checks if the link is a YouTube link and displays it 
  if (isYouTubeLink(link)) {
    link = convertToEmbed(link);
  }

  // this creates an object for the new songs
  let newSong = {
    imageUrl: imageUrl,
    song: song,
    artist: artist,
    link: link
  };

  // this clears input fields after you add something so it basically rests the input fields after add is clicked 
  //if you look at the last line on the add.onclick = addSongInfo;its basically performing the function addSongInfo
  imageInput.value = "";
  songNameInput.value = "";
  artistInput.value = "";
  songLinkInput.value = "";


  displaySongInfo(newSong);
}

// this function checks if the link is a YouTube link
function isYouTubeLink(link) {
  return link.includes("youtube.com") || link.includes("youtu.be");
}

// this function converts YouTube link to an embedded iframe
function convertToEmbed(link) {
  let videoId = link.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId[1]}`;
  }
  return link; // so this returns the link if it's is not a YouTube link
}

// this function displays the stored songs
function displaySongInfo(newSong) {
  // display image
  displayImage.innerHTML += `<p><img src="${newSong.imageUrl}"></p>`;
  // display song name
  displaySong.innerHTML += `<p>${newSong.song}</p>`;
  // display artist
  displayArtist.innerHTML += `<p>${newSong.artist}</p>`;
  // this displays song link in the correct size
  displayLink.innerHTML += `<p><iframe width="300" height="100" src="${newSong.link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></p>`;
}



let imageUploadInput = document.querySelector(".image-upload");

// Listen for change events on the file input
imageUploadInput.addEventListener("change", handleImageUpload);

function handleImageUpload(event) {
  // Get the selected file
  let file = event.target.files[0];

  if (file) {
    // Read the file as a data URL
    let reader = new FileReader();

    reader.onload = function(event) {
      // Set the data URL as the source for the image input
      imageInput.value = event.target.result;
    }

    // Read the file
    reader.readAsDataURL(file);
  }
}


// click event to add songs
add.onclick = addSongInfo;


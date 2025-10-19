// Your script here.
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
const textarea = document.querySelector('[name="text"]');

// Set default text
msg.text = textarea.value;

// Function to populate voices dropdown
function populateVoices() {
  voices = speechSynthesis.getVoices();
  
  // Clear existing options except the first placeholder
  voicesDropdown.innerHTML = '<option value="">Select A Voice</option>';
  
  // Populate dropdown with available voices
  voices.forEach((voice, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    
    // Mark default voice
    if (voice.default) {
      option.textContent += ' — DEFAULT';
    }
    
    voicesDropdown.appendChild(option);
  });
}

// Populate voices when they're loaded
populateVoices();
// Handle async voice loading in different browsers
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

// Function to toggle speaking
function toggle(startOver = true) {
  speechSynthesis.cancel();
  
  // Check if textarea has text
  if (textarea.value.trim() === '') {
    alert('Please enter some text to speak');
    return;
  }
  
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

// Function to set voice
function setVoice() {
  msg.voice = voices[this.value];
  toggle();
}

// Function to set option (rate, pitch, text)
function setOption() {
  msg[this.name] = this.value;
  toggle();
}

// Event listeners
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => speechSynthesis.cancel());
voicesDropdown.addEventListener('change', setVoice);

// Add event listeners to all options (rate, pitch, text)
options.forEach(option => option.addEventListener('change', setOption));


document.addEventListener("DOMContentLoaded", () => {
  // Select all dropdown toggle buttons
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle")

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      // Find the next sibling element which is the dropdown menu
      const dropdownMenu = toggle.nextElementSibling

      // Toggle the 'hidden' class to show or hide the dropdown menu
      if (dropdownMenu.classList.contains("hidden")) {
        // Hide any open dropdown menus before showing the new one
        document.querySelectorAll(".dropdown-menu").forEach((menu) => {
          menu.classList.add("hidden")
        })

        dropdownMenu.classList.remove("hidden")
      } else {
        dropdownMenu.classList.add("hidden")
      }
    })
  })

  // Optional: Clicking outside of an open dropdown menu closes it
  window.addEventListener("click", (event) => {
    if (!event.target.matches(".dropdown-toggle")) {
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        if (!menu.contains(event.target)) {
          menu.classList.add("hidden")
        }
      })
    }
  })
})



// Mobile menu toggle
const mobileMenuButton = document.querySelector(".mobile-menu-button")
const mobileMenu = document.querySelector(".navigation-menu")

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden")
})

//Nav Script ends here



const paragraph=[

'Feet evil to hold long he open knew an no apartments occasional boisterous as solicitude to introduced or fifteen covered we enjoyed demesne is in prepare in stimulated my everything it literature greatly explain attempt perhaps in feeling he house men taste bed not drawn joy through enquire however do equally herself at greatly. ',
'Trying to make a wise good choice when thinking about what kinds of careers might be best for you is a hard thing to do your future may very well depend on the ways you go about finding the best job openings for you in the world of work some people will feel that there is one and only one job in the world for them hard.',
'There are many idiosyncratic typing styles in between novice style hunt and peck and touch typing for example many hunt and peck typists have the keyboard layout memorized and are able to type while focusing their gaze on the screen some use just two fingers while others use 3 to 6 fingers some use their fingers very.',
'In one study of average computer users the average rate for transcription was 33 words per minute and 19 words per minute for composition in the same study when the group was divided into fast moderate and slow groups the average speeds were 40 wpm 35 wpm and 23 wpm respectively an average professional typist reaches.',
'A freelancer or freelance worker is a term commonly used for a person who is self employed and is not necessarily committed to a particular employer long term freelance workers are sometimes represented by a company or a temporary agency that resells freelance labor to clients others work independently or use professional associations.',
'Trying to make a wise good choice when thinking about what kinds of careers might be best for you is a hard thing to do your future may very well depend on the ways you go about finding the best job openings for you in the world of work some people will feel that there is one and only one job in the world for them hard thinking and a lot.',
'The basic technique stands in contrast to hunt and peck typing in which the typist keeps his or her eyes on the source copy at all times touch typing also involves the use of the home row method where typists keep their wrists up rather than resting them on a desk or keyboard which can cause carpal tunnel syndrome to avoid this typists.',
'Being human makes us susceptible to the onset of feelings the role of these emotions varies some of them are useful while others may be harmful the use of social media for self expression has reached a point that it makes us feel we can say anything this begins when we see people expressing anything and everything that come to mind.',
'that acting on this attraction is okay not all feelings deserve expression we find ourselves creating our own problems when we let our present emotions control our actions a late 20th century trend in typing primarily used with devices with small keyboards such as pdas and Smartphones is thumbing or thumb typing this can be accomplished.',
'Some people combine touch typing and hunt and peck by using a buffering method in the buffer method the typist looks at the source copy mentally stores one or several sentences then looks at the keyboard and types out the buffer of sentences this eliminates frequent up and down motions with the head and is used in typing competitions.',

];

const typingText=document.querySelector("#typing-text p"),
inpField=document.querySelector("#input-field "),
timeTag = document.querySelector("#timer h1 "),
accuracyTag=document.querySelector("#accuracy h1"),
wpmTag=document.querySelector("#wpm h1"),
cpmTag=document.querySelector("#cpm h1"),
overlay = document.querySelector("#overlay"),
resultDiv = document.querySelector("#resultDiv"),
cancelBtn = document.querySelector(".cancel"),
tryAgainBtn = document.querySelector("#tryAgainBtn"),
resWpm = document.querySelector(".reswpm"),
resCpm = document.querySelector(".rescpm"),
resAccuracy = document.querySelector(".resaccuracy"),
resultImage = document.querySelector("#resultImage"),
resultHeading = document.querySelector("#resultHeading"),
startAnimation=document.querySelector("#startAnimation");

let mistakesTag;
let timer, maxTime = 60,
timeLeft = maxTime;


let charIndex = mistakes = isTyping = 0;


function randomParagraph(){
  let randIndex=Math.floor(Math.random() * paragraph.length);

  paragraph[randIndex].split('').forEach(span =>{
      let spanTag= `<span class="relative ms-0.1">${span}</span>`;
      typingText.innerHTML +=spanTag;
    })
    document.addEventListener('keydown', () => inpField.focus());
    typingText.addEventListener('click', () => inpField.focus());
};

function initTyping(){
  const characters=typingText.querySelectorAll("span");
  let typedChar=inpField.value.split("")[charIndex];
  if(charIndex < characters.length - 1 && timeLeft > 0){
      //prevent time start with key click
  if(!isTyping){
      timer = setInterval(initTimer, 1000);
      isTyping = true;
  }
  // startAnimation.classList.remove("block");
  // startAnimation.classList.add("hidden");
  startAnimation.innerText="typing..."
  
  

  
  //remove classes on null or backspace
if(typedChar==null){
  charIndex--;
  //decreament if only it contains the class incorrect
  if(characters[charIndex].classList.contains("incorrect")) {
      mistakes--;
  }

  characters[charIndex].classList.remove("correct", "incorrect");

}
else{

  if(characters[charIndex].innerText === typedChar){
    characters[charIndex].classList.add("correct");
    
   }
   else{
      mistakes++;
    characters[charIndex].classList.add("incorrect");
   }
   charIndex++;
}

characters.forEach(span => span.classList.remove("active"))
characters[charIndex].classList.add("active");

//calculates every 5 chars as a word
let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

wpmTag.innerText = wpm;
//  mistakesTag.innerText= mistakes;
cpmTag.innerText = charIndex - mistakes; //cut here

 // Calculate accuracy
 let accuracy = Math.round(((charIndex - mistakes) / charIndex) * 100);
 accuracy = accuracy < 0 || !accuracy || accuracy === Infinity ? 0 : accuracy;
 accuracyTag.innerText = accuracy + "%";
  }else{
      clearInterval(timer);
      inpField.value = "";
      setTimeout(() => {
          updateResultValues(wpmTag.innerText, cpmTag.innerText, accuracyTag.innerText);
          showResultDiv();
        }, 2000);  // Wait for 3 seconds before showing the result
      

  }
  
}

function initTimer(){
  if(timeLeft > 0){
      timeLeft--;
      timeTag.innerText= timeLeft;
  }else{
      clearInterval(timer)
      setTimeout(() => {
          updateResultValues(wpmTag.innerText, cpmTag.innerText, accuracyTag.innerText);
          showResultDiv();
        }, 2000); 
  }
}

function updateResultValues(wpm, cpm, accuracy) {
  resWpm.innerText = `${wpm} WPM`;
  resCpm.innerText = `${cpm} CPM`;
  resAccuracy.innerText = accuracy;

  //diffrent output based on wpm
  if (parseInt(wpm) > 20) {
      resultImage.src = "images/t-rex.png";
      resultHeading.innerText = "You're Lightning Fast!";
    } else {
      resultImage.src = "images/turtle.png";
      resultHeading.innerText = "You're a Turtle.";
    }
  
}





function showResultDiv() {
  overlay.classList.remove("hidden");
}

function hideResultDiv() {
  overlay.classList.add("hidden");
}

//new game

function newGame() {
  clearInterval(timer);
  charIndex = mistakes = 0;
  timeLeft = maxTime;
  isTyping = false;
  inpField.value = "";
  timeTag.innerText = timeLeft;
  mistakesTag.innerText = 0;
  wpmTag.innerText = 0;
  cpmTag.innerText = 0;
  accuracyTag.innerText = "0%";
  randomParagraph();
  hideResultDiv();
}

cancelBtn.addEventListener("click", hideResultDiv);
tryAgainBtn.addEventListener("click", newGame);


randomParagraph();
inpField.addEventListener('input', initTyping);
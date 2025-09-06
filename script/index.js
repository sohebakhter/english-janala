const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => displayLesson(data.data))
}

const removeActive = () => {
    const lessonButtons = document.querySelectorAll('.lesson-btn')
    lessonButtons.forEach(btn=> btn.classList.remove('চালু'))
}

const loadWordLevel = (id) => {
    const url = (`https://openapi.programming-hero.com/api/level/${id}`)
    fetch(url)
        .then(res => res.json())
        .then(json => {
            removeActive(); //এই বেক্তি সব 'চালু' কে রিমুভ করতেছে *লুপ করে করে। 
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            clickBtn.classList.add('চালু') // এই আবার চালু যুক্ত করতেছে। 
            displayWordLevel(json.data) // পরে যাইয়া ডিসপ্লেতে সো করতেছে 
        })

}


const displayWordLevel = (words) => {
    const wordContainer = document.getElementById('word-container')
    wordContainer.innerHTML = '';

    // condition for lesson 4 and 7 is empty so this is a attention
    if (words.length == 0) {
        wordContainer.innerHTML = `
            <div class="col-span-full text-center space-y-8 font-bangla py-10">
                <img class="mx-auto" src="assets/alert-error.png" alt="">
                <p class="text-xl text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h1 class="font-medium text-5xl">নেক্সট Lesson এ যান</h1>
            </div>
        `
    }
    // এখানে কিছু জিনিস empty থাকায় conditional rendaring / ? এইটা নিয়ে কাজ করা হয়েছে
    for (const word of words) {
        const wordDiv = document.createElement('div')
        wordDiv.innerHTML = `
    
        <div class=" bg-white rounded-xl py-20 px-10 space-y-5 text-center">
                <h1 class="font-semibold text-2xl">${word.word ? word.word : 'word পাওয়া যায়নি'}</h1>
                <p>Meaning /Pronounciation</p> 
                <p class="font-medium text-2xl font-bangla">"${word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি'} / ${word.pronunciation ? word.pronunciation : 'উচ্চারণ পাওয়া যায়নি'}"</p>
                <div class="flex justify-between ">
                    <button class="btn btn-square hover:bg-[#1A91FF60] bg-[#1A91FF10]">
                        <i class="fa-solid fa-circle-info"></i>
                    </button>
                    <button class="btn btn-square hover:bg-[#1A91FF60] bg-[#1A91FF10]">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
            </div>
    
    `
        wordContainer.appendChild(wordDiv)
    }

}


const displayLesson = (lessons) => {
    // 1. get the container
    const lessonContainer = document.getElementById('lesson-container')
    lessonContainer.innerHTML = '';
    // 2. create element for lesson
    for (const lesson of lessons) {
        // console.log(lesson)
        const lessonButton = document.createElement('div')
        lessonButton.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" onclick="loadWordLevel(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson -${lesson.level_no}</button>
        `
        lessonContainer.appendChild(lessonButton);
    }
}

loadLessons();
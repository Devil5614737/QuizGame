const body=document.getElementById('body')
    const btn=document.getElementById('darkSwitch')

const question_container=document.getElementById('question');
const option_container=document.getElementById('options');
let score=0;
const score_container=document.getElementById('score');



// creating dark-mode functionality😎😎
function darkMode(){
    btn.addEventListener('click',()=>{
        body.classList.toggle('dark');
        if(body.classList.value==='dark'){

            btn.textContent="on";
        }else{
            btn.textContent="off";
        }
           
        
    })
}

darkMode();

window.alert('On every right answer, you get  1 point, and if wrong, 1 point will be deducted.')
async function fetchData(){
    try {
        const res=await fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple");
        const data=await res.json();
        displayData(data.results[0]);

    } catch (error) {
        console.log(error);
    }
}
fetchData();




function displayData(data){

// displaying the question;

   question_container.innerText= !data?'...loading':data&&data.question


// displaying the options;
data&&data.incorrect_answers.push(data.correct_answer);
data&&data.incorrect_answers.forEach(io=>{
    let listItem=document.createElement('li')
    listItem.textContent=io
    option_container.appendChild(listItem);


    listItem.addEventListener('click',()=>{

        if(listItem.textContent===data.correct_answer){
            listItem.classList.add('correct');
            listItem.classList.remove('wrong');
            score++;
            score_container.textContent=score
          question_container.innerText="";
          option_container.innerText="";
              fetchData()
       
        }
        else if(listItem.textContent!==data.correct_answer){
            listItem.classList.add('wrong');
            listItem.classList.remove('correct');
            if(score>0){

                score--;
                score_container.textContent=score
            }else{
                return alert('you lost')
            }

            question_container.innerText="";
            option_container.innerText="";
                fetchData()
        }
    })


})

}


displayData();

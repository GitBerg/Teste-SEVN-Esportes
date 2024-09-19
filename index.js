const round = document.getElementById("round");
const next = document.getElementById("next");
const previous = document.getElementById("prev");

const ul = document.querySelector('ul');

let current_round = 0;
let qtd_pages;

const colorFLag = {
    'time-a': './Assets/flags/team_shield_a.svg',
    'time-b': './Assets/flags/team_shield_b.svg',
    'time-c': './Assets/flags/team_shield_c.svg',
    'time-d': './Assets/flags/team_shield_d.svg',
    'time-e': './Assets/flags/team_shield_e.svg',
    'time-f': './Assets/flags/team_shield_f.svg',
    'time-g': './Assets/flags/team_shield_g.svg',
    'time-h': './Assets/flags/team_shield_h.svg'
}

const createBlock = (flag1, name1, score1, flag2, name2, score2) => {
    const li = document.createElement('li');

    const divFlag1 = document.createElement('div');
    divFlag1.className = 'team-flag';
    
    const img1 = document.createElement('img');
    img1.className = 'flag';
    img1.src = colorFLag[flag1];
    
    const spanName1 = document.createElement('span');
    spanName1.className = 'team_name';
    spanName1.innerHTML = name1;
    
    divFlag1.appendChild(img1);
    divFlag1.appendChild(spanName1);
    
    const divScore = document.createElement('div');
    divScore.className = 'score';

    const spanScore1 = document.createElement('span');
    const spanScore2 = document.createElement('span');

    spanScore1.id = 'score1';
    spanScore1.id = 'score2';
    spanScore1.innerHTML = score1;
    spanScore2.innerHTML = score2;
    
    divScore.appendChild(spanScore1);
    
    const spanVs = document.createElement('span');
    spanVs.id = 'vs';
    
    const imgVs = document.createElement('img');
    imgVs.className = 'flag';
    imgVs.src = './Assets/Group 3.png';
    
    spanVs.appendChild(imgVs);
    divScore.appendChild(spanVs);
    divScore.appendChild(spanScore2);
    
    const divFlag2 = document.createElement('div');
    divFlag2.className = 'team-flag';
    
    const spanName2 = document.createElement('span');
    spanName2.className = 'team_name';
    spanName2.innerHTML = name2;
    
    const img2 = document.createElement('img');
    img2.className = 'flag';
    img2.src = colorFLag[flag2];
    
    divFlag2.appendChild(spanName2);
    divFlag2.appendChild(img2);
    
    li.appendChild(divFlag1);
    li.appendChild(divScore);
    li.appendChild(divFlag2);
    
    ul.appendChild(li);

}

const Loading = () =>{
    const div = document.createElement('div');
    div.id = 'loading';
    const effect = document.createElement('div');
    effect.id = 'effect';
    div.appendChild(effect);
    ul.appendChild(div)
}

const fetchData = async () => {
    Loading();
    const response = await fetch('https://sevn-pleno-esportes.deno.dev/');
    const data = await response.json();
    return data
}

const buildRound = (data) =>{
    round.innerText = data;
}

const buildResults = async (current_round) => {
    const data = await fetchData();
    qtd_pages = data.length;
    buildRound(data[current_round].round);
    data[current_round].games.forEach(element => {
        const {team_home_id, team_home_name, team_home_score, team_away_id, team_away_name, team_away_score} = element
        createBlock(team_home_id, team_home_name, team_home_score, team_away_id, team_away_name, team_away_score)
    });
    document.querySelector('#loading').remove()
}

const nextRound = async () => {
    if(current_round < qtd_pages - 1){
        current_round++
        ul.innerHTML = '';
        await buildResults(current_round)
        next.style.backgroundColor = "#33B667"
        previous.style.backgroundColor = "#33B667"
    }if(current_round === qtd_pages - 1 ){
        next.style.backgroundColor = "#808080"
    }
        
    
}

const prevRound = async () => {
    if(current_round > 0 ){
        previous.style.backgroundColor = "#33B667"
        next.style.backgroundColor = "#33B667"
        current_round--
        ul.innerHTML = '';     
        await buildResults(current_round)
    }if(current_round === 0){
        previous.style.backgroundColor = "#808080"
    }
}

next.addEventListener('click', nextRound)
previous.addEventListener('click', prevRound)

buildResults(current_round)

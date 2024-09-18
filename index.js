const round = document.getElementById("round");

const colorFLag = {
    'timetime-a': 'background: linear-gradient(180deg, #FF0000 0%, rgba(233, 101, 101, 0.3) 100%);',
    'timetime-b': 'background: linear-gradient(180deg, #0038FF 0%, rgba(0, 56, 255, 0.3) 100%);',
    'timetime-c': 'background: linear-gradient(180deg, #FF9900 0%, rgba(255, 153, 0, 0.3) 100%);',
    'timetime-d': 'background: linear-gradient(180deg, #72CB00 0%, rgba(114, 203, 0, 0.3) 100%);',
    'timetime-e': 'background: linear-gradient(180deg, #00C797 0%, rgba(0, 199, 151, 0.3) 100%);',
    'timetime-f': 'background: linear-gradient(180deg, #0088D4 0%, rgba(34, 176, 255, 0.3) 100%);',
    'timetime-g': 'background: linear-gradient(180deg, #AD00FF 0%, rgba(191, 101, 233, 0.3) 100%);',
    'timetime-h': 'background: linear-gradient(180deg, #FF00E6 0%, rgba(255, 0, 214, 0.3) 100%);'
}

const createBlock = (flag1, name1, score1, flag2, name2, score2) => {
    const li = document.createElement('li');
    li.id = 'first-block';
    
    const divFlag1 = document.createElement('div');
    divFlag1.className = 'team-flag';
    
    const img1 = document.createElement('img');
    img1.className = 'flag';
    img1.src = './Assets/team_shield_a.png';
    
    const spanName1 = document.createElement('span');
    spanName1.className = 'team_name';
    
    divFlag1.appendChild(img1);
    divFlag1.appendChild(spanName1);
    
    const divScore = document.createElement('div');
    divScore.className = 'score';
    divScore.innerHTML = '0';
    
    const spanVs = document.createElement('span');
    spanVs.id = 'vs';
    
    const imgVs = document.createElement('img');
    imgVs.className = 'flag';
    imgVs.src = './Assets/Group 3.png';
    
    spanVs.appendChild(imgVs);
    divScore.appendChild(spanVs);
    divScore.appendChild(document.createTextNode('0'));
    
    const spanFlag2 = document.createElement('span');
    spanFlag2.className = 'team-flag';
    
    const spanName2 = document.createElement('span');
    spanName2.className = 'team_name';
    
    const img2 = document.createElement('img');
    img2.className = 'flag';
    img2.src = './Assets/team_shield_a.png';
    
    spanFlag2.appendChild(spanName2);
    spanFlag2.appendChild(img2);
    
    li.appendChild(divFlag1);
    li.appendChild(divScore);
    li.appendChild(spanFlag2);
    
    document.querySelector('ul').appendChild(li);

}

let current_round = 0;

const fetchData = async () => {
    const response = await fetch('https://sevn-pleno-esportes.deno.dev/');
    const data = await response.json();
    return data
}

const buildRound = (data) =>{
    round.innerText = data;
}

const buildResults = async () => {
    const data = await fetchData();
    buildRound(data[current_round].round);
    data[current_round].games.forEach(element => {
        createBlock()
    });
}

buildResults()

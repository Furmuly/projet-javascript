 let grades = {}
 let baseKnowledges = []
 let ecgKnowledges = []
 let moduleKnowledges = []
 let finalGradesAverage = []
 let finalGradesAverageWeight =[]

 window.addEventListener("load", () => {
    console.log('page is fully loaded');
    getGradesValues()
    getGradesValuesFromHTML()
    registerChangeEventsListenerOnInputs()

 });

 function calculateAverage(gradesArray) {

    let sum = 0
    let divider = 0

    for (let i = 0; i < gradesArray.length; i++) {
        if (!isNaN(gradesArray[i])) {
            sum += gradesArray[i]
            divider++
        }
    }

    return sum / divider

}

function weightedAverage(gradesArray, weightArray) {
    let sum = 0
    let divider = 0

    for (let i = 0; i < gradesArray.length; i++) {
        if (!isNaN(gradesArray[i])){
            sum += (gradesArray[i] * weightArray[i])
            divider += weightArray[i]
        }
        }
    return sum /divider

}

function roundNumber(number, multiple) {
    return (Math.round(number / multiple) * multiple)
}

function getGradesValuesFromHTML() {
    let inputs = document.getElementsByTagName('input')

    for (let input of inputs) {
        grades[input.id] = parseFloat(input.value)

    }
    arrayConstituition()
}

function arrayConstituition() {
    baseKnowledges = [
        grades["math_1"],
        grades["math_2"],
        grades["math_3"],
        grades["ang_1"],
        grades["ang_2"],
        grades["ang_3"],
        grades["ang_4"],
        grades["ang_5"],
    ]
    let baseKnowledgesAvg = roundNumber(calculateAverage(ecgKnowledges), 0.5)

    ecgKnowledges = [
        grades["ecg_1"],
        grades["ecg_2"],
        grades["ecg_3"],
        grades["ecg_4"],
        grades["ecg_5"],
        grades["ecg_6"],
        grades["ecg_7"],
        grades["ecg_8"],
    ]
    let ecgKnowledgesAvg = roundNumber(calculateAverage(ecgKnowledges), 0.5)

    moduleKnowledges = [
        grades["module"],
        grades["cie"],
    ]
    let moduleKnowledgesAvg = weightedAverage(moduleKnowledges, [80, 20])

    finalGradesAverage = [
        baseKnowledgesAvg,
        ecgKnowledgesAvg,
        moduleKnowledgesAvg,
        grades["tpi"],
    ]

    finalGradesAverageWeight = [
        grades["weight_baseKnowledges"],
        grades["weight_ecg"],
        grades["weight_moduleKnowledges"],
        grades["weight_tpi"],
    ]

    writeAverageToHTML(baseKnowledgesAvg, ecgKnowledgesAvg, moduleKnowledgesAvg,)
}

    function registerChangeEventsListenerOnInputs() {

    let inputs = document.getElementsByTagName('input')

    for (let input of inputs) {
        input.addEventListener('change', getGradesValuesFromHTML)
    }
}

function writeAverageToHTML(baseKnowledgesAverage, ecgKnowledgessAverage, moduleKnowledgesAverage,  finalGradesAverage, finalGradesAverageWeight){
    document.getElementById(`CBE`).innerText = baseKnowledgesAverage.toFixed(1)
    document.getElementById('CG').innerText = ecgKnowledgessAverage.toFixed(1)
    document.getElementById('CI').innerText = moduleKnowledgesAverage.toFixed(1)
    document.getElementById('fa').innerText =  finalGradesAverage.toFixed(1)
    document.getElementById('fw').innerText = finalGradesAverageWeight .toFixed(1)

}

function getGradesValues() {
    let inputs = document.getElementsByTagName('input')
    for (let input of inputs) {
        //console.log(parseFloat(input.value))
        grades[input.id] = parseFloat(input.value)
    }
}


const calculateformelement = document.getElementById("calculateform");
const calculatemarks = (event) => {
    const maxmarks = 400;
    event.preventDefault();
    const formdata = new FormData(calculateformelement);
    //sara form ka data isme a jay ga 
    const data = {};

    formdata.forEach((value, key) => {
        data[key] = +value;
    })

    const total_marks = data.maths + data.english + data.islamyat + data.science;
    const percentage = (total_marks / maxmarks) * 100;
    const result_element = document.createElement("p");
    result_element.className = "result";
    result_element.innerText = `you have got ${total_marks} marks out of ${maxmarks} and your percentage is ${percentage}%`
    calculateformelement.after(result_element);
}
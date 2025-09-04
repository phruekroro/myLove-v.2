function checkDate() {
    const input = document.getElementById('anniversary').value;
    if (input == "041125") {
        window.location.href = "menu.html";
    } else {
        alert("ผิดนะ! ใส่ใหม่อีกครั้ง 😠"); 
    }
}
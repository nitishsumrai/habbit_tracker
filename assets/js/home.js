
// Submit form that updates the Status of Hobby
document.querySelectorAll('input[type=radio]').forEach(function (elem) {
    console.log(elem);
    elem.addEventListener('change', function (e) {
        console.log(e.target.parentElement.parentElement);
        console.log(e.target.parentElement.parentElement)
        //   get form who's status is being changed
        let form = e.target.parentElement.parentElement;
        form.submit();
    })
});

document.addEventListener("DOMContentLoaded", () => {

  $l('.todo-submit').on('click', () => {
    const text = $l('.textbox').nodes[0].value;


    if (text !== "") {
      $l('.list').append(`<li>${text}
        <button class='finished-btn' type='button' >
        Finished!
        </button></li>`);


      $l('.finished-btn').on('click', (e) => {
        $l(e.currentTarget).nodes[0].parentNode.remove();
        $l('.todos-complete').data('0','1');
      })

    }
    $l('.textbox').nodes[0].value = "";
  })
})

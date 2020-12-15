$(function () {
    $(".create-form").on("submit", function (event) {
        event.preventDefault();
        const newBurger = {
            burger_name: $("#ca").val().trim()
        };
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                location.reload();
            }
        );
    });

    $(".change-devoured").on("click", function (event) {
        event.preventDefault();
        const id = $(this).data("id");
        const isDevoured = 1;
        const newDevouredState = {
            devoured: isDevoured
        };
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevouredState
        }).then(
            function () {
                location.reload();
            }
        );
    });

    $(".clearBurger").on("click", function (event) {
        event.preventDefault();
        $.ajax("/api/clear", {
            type: "DELETE"
        }
        ).then(
            function () {
                location.reload();
            });
        });
});
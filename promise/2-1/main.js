$(document).ready(function() {
    // append user objects from users array to profile div
    for (let i = 0 ; i < users.length ; i++) {
        $('.profiles').append(`<div class="col-lg-4 col-md-6 profile-div p-0 border border-1 border-secondary rounded d-flex flex-column justify-content-between">
        <img src="${users[i].avatar}" class="img-fluid w-100">
        <div class="p-2">
            <h5>${users[i].first_name} ${users[i].last_name}</h5>
            <p>${users[i].first_name} ${users[i].last_name} is maktab 45 user by UID of ${users[i].id}, You can easily get in touch with ${users[i].first_name} form</p>
            <a href="">${users[i].email}</a>
            <p>UID: ${users[i].id}</p>
            <p>Email: ${users[i].email}</p>
            <button class="bg-primary profile-view text-white border-0 p-2">Profile</button>
        </div>
        </div>`)
        if (i >= 6) {
            //display none for page2 profiles
            $('.profile-div').eq(i).addClass('d-none')
        }
    }

    $('.about-us-button').click(function() {
        /*make other divs except menu bar hidden when click
         on about-us button and show about-us paragraph*/
        $('.container').children().eq(1).addClass('d-none')
        $('.container').children().eq(2).addClass('d-none')
        $('.about-us').addClass('d-block')
        $('.about-us').removeClass('d-none')
    })

    //set to variable for pagination
    //x:divide users array to 6, every page must have 6 profile cards
    //y:remaining of users array length to 6 for last page
    let x = Math.floor(users.length/6)
    let y = Math.ceil((users.length%6)/6)

    //make page buttons with x and y
    for (let i = 0 ; i < x + y ; i++) {
        $('.pagination').append(`<button class="border-0 btn${i+1} border border-0 rounded">${i+1}</button>`)
    }

    function paginationFunction() {
        for (let i = 0 ; i < x + y ; i++) {
            $('.pagination button').eq(i).addClass(`btn${i+1}`)
        }

        //when click on each on button, profile cards of non-relative pages must be hidden
        for (let i = 0 ; i < x+y ; i++) {
            $('.pagination button').eq(i).click(function() {
                for (let j = 0 ; j < users.length ; j++) {
                    $('.profile-div').eq(j).addClass("d-none")
                    $('.profile-div').eq(j).removeClass("d-block")
                }
                for (let z = i * 6 ; z < (i + 1) * 6 ; z++) {
                    $('.profile-div').eq(z).removeClass("d-none")
                    $('.profile-div').eq(z).addClass("d-block")
                }
            })
        }
    }

    //run pagination function to make pagination buttons
    paginationFunction()

    /*when click on search button we will search on
    firstname,lastname,uid and emails of profiles*/
    $('.search-button').click(function() {
        let text = $('input').val()
        if ($('.about-us').attr('class').includes('d-block')) {
            $('.container').children().eq(1).removeClass('d-none')
            $('.container').children().eq(1).addClass('d-flex')
            $('.container').children().eq(2).removeClass('d-none')
            $('.container').children().eq(2).addClass('d-flex')
            $('.about-us').removeClass('d-block')
            $('.about-us').addClass('d-none')
        }

        for (let i = 0 ; i < users.length ; i++) {
            let searchable = $('.profile-div div').eq(i).children()
            if (searchable.eq(0).text().toLowerCase().includes(text.toLowerCase()) | searchable.eq(2).text().toLowerCase().includes(text.toLowerCase()) | searchable.eq(3).text().toLowerCase().includes(text.toLowerCase())) {
                $('.profile-div').eq(i).addClass('d-block')
                $('.profile-div').eq(i).removeClass("d-none")
            } else {
                $('.profile-div').eq(i).addClass('d-none')
                $('.profile-div').eq(i).removeClass("d-block")
            }
        }
    })

    $('.profile-view').click(function() {
        for (let i = 1 ; i < 5 ; i++) {
            if (i == 4) {
                $('.container').children().eq(i).removeClass('d-none')
            } else {
                $('.container').children().eq(i).addClass('d-none') 
            }
        }
    
        let userIndex = $(this).parent().parent().index()
        $('.person').children().eq(0).text(`${users[userIndex].first_name} profile`)
        $('.person').children().eq(1).attr('src',`${users[userIndex].avatar}`)
        $('.person').children().eq(2).children().eq(0).val(`${users[userIndex].first_name}`)
        $('.person').children().eq(2).children().eq(1).val(`${users[userIndex].last_name}`)
        $('.person').children().eq(3).text(`UID: ${users[userIndex].id}`)
        $('.person').children().eq(4).children().eq(0).val(`${users[userIndex].email}`)
    })

    //delete profile from profile cards and users array
    $('.btn-delete').click(function() {
        let id = $('.person').children().eq(3).text().split(' ')[1]
        for (let i = 0 ; i < users.length ; i++) {
            if ($('.profile-div').eq(i).children().eq(1).children().eq(3).text().split(' ')[1] == '5') {
                $('.profile-div').eq(i).remove()
            }
        }
        users.splice(users.findIndex(item => item.id == id),1)
    })

    //update user specifications
    $('.btn-update').click(function() {
        let index = Number($(this).parent().children().eq(3).text().split(' ')[1])
        let userId = users.findIndex(item => item.id == index)
        users[userId].first_name = $('.person').children().eq(2).children().eq(0).val()
        users[userId].last_name = $('.person').children().eq(2).children().eq(1).val()
        users[userId].email = $('.person').children().eq(4).children().eq(0).val()
    })

    $('.add-user').click(function() {
        for (let i = 1 ; i < 5 ; i++) {
            if (i == 4) {
                $('.container').children().eq(i).removeClass('d-none')
            } else {
                $('.container').children().eq(i).addClass('d-none') 
            }
        }
        //add new uid to user with addition of users.length and one
        //example:if last user have uid of 10 then added uid will have uid of 11
        users.push({})
        users[users.length - 1].id = users.length
        $('.person').children().eq(3).text(`UID: ${users[users.length - 1].id}`)
    })

    $('.home-button').click(function() {
        x = Math.floor(users.length/6)
        y = users.length%6
        $('.profiles').empty()
        $('.pagination').empty()

        for (let i = 1; i < 5 ; i++) {
            $('.container').children().eq(i).addClass('d-none')
        }

        $('.container').children().eq(1).removeClass('d-none')
        $('.container').children().eq(2).removeClass('d-none')

        for (let i = 0 ; i < users.length ; i++) {
            $('.profiles').append(`<div class="col-lg-4 col-md-6 profile-div p-0 border border-1 border-secondary rounded d-flex flex-column justify-content-between">
            <img src="${users[i].avatar}" class="img-fluid w-100">
            <div class="p-2">
                <h5>${users[i].first_name} ${users[i].last_name}</h5>
                <p>${users[i].first_name} ${users[i].last_name} is maktab 45 user by UID of ${users[i].id}, You can easily get in touch with ${users[i].first_name} form</p>
                <a href="">${users[i].email}</a>
                <p>UID: ${users[i].id}</p>
                <p>Email: ${users[i].email}</p>
                <button class="bg-primary profile-view text-white border-0 p-2">Profile</button>
            </div>
            </div>`)
            if (i >= 6) {
                $('.profile-div').eq(i).addClass('d-none')
            }
        }

        for (let i = 0 ; i < x ; i++) {
            $('.pagination').append(`<button class="border-0 btn${i+1} border border-0 rounded">${i+1}</button>`)
        }
        if (y != 0) {
            $('.pagination').append(`<button class="border-0 btn${x+1} border border-0 rounded">${x+1}</button>`)
        }

        paginationFunction()

        $('.profile-view').click(function() {
            $('.container').children().eq(1).addClass('d-none')
            $('.container').children().eq(2).addClass('d-none')
            $('.container').children().eq(3).addClass('d-none')
            $('.container').children().eq(4).removeClass('d-none')
    
            let userIndex = $(this).parent().parent().index()
            $('.person').children().eq(0).text(`${users[userIndex].first_name} profile`)
            $('.person').children().eq(1).attr('src',`${users[userIndex].avatar}`)
            $('.person').children().eq(2).children().eq(0).val(`${users[userIndex].first_name}`)
            $('.person').children().eq(2).children().eq(1).val(`${users[userIndex].last_name}`)
            $('.person').children().eq(3).text(`UID: ${users[userIndex].id}`)
            $('.person').children().eq(4).children().eq(0).val(`${users[userIndex].email}`)
        })
    })
})
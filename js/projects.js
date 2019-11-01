function populateProjects() {
    var projects = [
        {
            "title": "Crimild Engine",
            "description": "A C++/OpenGL scene graph based framework for games, simulations and interactive applications.",
            "thumbnailURL": "img/thumb-crimild.jpg",
            "links": [
                {
                    "title": "Blog",
                    "url": "http://crimild.hhsaez.com"
                },
                {
                    "title": "Videos",
                    "url": "https://www.youtube.com/watch?v=VaEGOIhYDdA&list=PLdYfmMNul2m0gu4RsEKG148tBccbU7RRL"
                },
                {
                    "title": "Source Code",
                    "url": "https://github.com/hhsaez/crimild"
                },
                {
                    "title": "Demos",
                    "url": "https://github.com/hhsaez/crimild-demos"
                }
            ]
        },
        {
            "title": "Setenta y Siete",
            "description": "\"Setenta y Siete\" (a.k.a. \"Seventy Seven\") is a short comic book about time travel and paradoxes. It was presented at the contest organized by Crack Bang Boom 2019, one of the biggest comic books conventions in Argentina.",
            "thumbnailURL": "img/thumb-77.jpg",
            "links": [
                {
                    "title": "Download PDF (Spanish)",
                    "url": "projects/setenta_y_siete/setenta_y_siete.pdf"
                },
            ]
        },
        {
            "title": "Offices and Managers #1",
            "description": "\"Offices and Managers Presenta: Falla critica\" is a short comic book about five adventurers in an impossible situation.",
            "thumbnailURL": "img/thumb-oam-01.jpg",
            "links": [
                {
                    "title": "Download PDF (Spanish)",
                    "url": "projects/oam_01/oam_01.pdf"
                },
            ]
        },
        {
            "title": "Merge Wars",
            "description": "\"Merge Wars\" is a prototype for a casual-type of game where the player needs to improve her base by merging buildings of the same type.",
            "thumbnailURL": "img/thumb-merge-wars-prototype.jpg",
            "links": [
                {
                    "title": "Play!",
                    "url": "https://hhsaez.itch.io/merge-wars"
                },
            ]
        },
        {
            "title": "GREED",
            "description": "\"GREED\" is a prototype for a minimalistic game in which you need to learn the best route to maximize your score at the end.",
            "thumbnailURL": "img/thumb-greed-prototype.jpg",
            "links": [
                {
                    "title": "Play!",
                    "url": "https://hhsaez.itch.io/greed"
                },
            ]
        },
        {
            "title": "Pocket Balloon",
            "description": "Pocket Balloon uses augmented reality to give you a unique experience. Drive your balloon just by touching the screen and blowing. Look for landing zones around you and land your balloon on them to get points and compete with your friends.",
            "thumbnailURL": "img/thumb-pocket-balloon.jpg",
            "links": [
                {
                    "title": "View details",
                    "url": "http://pocketballoon.hhsaez.com"
                },
                {
                    "title": "App Store",
                    "url": "https://itunes.apple.com/us/app/pocket-balloon/id1368660677?ls=1&mt=8"
                }
            ]
        },
        {
            "title": "Le Voyage",
            "description": "An iOS game inspired by the works of George Méliès and Jules Verne. Fly through the sky and space while using swipe controls to avoid balloons, storms, asteroids and other kinds of dangers.",
            "thumbnailURL": "img/thumb-le-voyage.jpg",
            "links": [
                {
                    "title": "View details",
                    "url": "projects/levoyage/index.html"
                },
                {
                    "title": "Trailer",
                    "url": "https://www.youtube.com/watch?v=_kpfpX20Yok"
                },
                {
                    "title": "App Store",
                    "url": "https://itunes.apple.com/us/app/le-voyage/id1067434255?ls=1&mt=8"
                }
            ]
        },
        {
            "title": "Judgement Day",
            "description": "A shooter-based board game with active-turns battles using cards. It was developed during the LD41 challenge using the theme \"Combine 2 Incompatible Genres\"",
            "thumbnailURL": "img/thumb-ld41-judgement-day.jpg",
            "links": [
                {
                    "title": "View Details",
                    "url": "https://hhsaez.itch.io/judgement-day-the-board-game"
                },
                {
                    "title": "LD41 Entry",
                    "url": "https://ldjam.com/events/ludum-dare/41/judgement-day-the-board-game"
                }
            ]
        },
        {
            "title": "The P.U.R.G.E. Protocol",
            "description": "A puzzle/trivia game developed for the LD39 challenge using the theme \"Running out of Power\"",
            "thumbnailURL": "img/thumb-the-purge-protocol.jpg",
            "links": [
                {
                    "title": "View Details",
                    "url": "https://hhsaez.itch.io/the-purge-protocol"
                },
                {
                    "title": "LD39 Entry",
                    "url": "https://ldjam.com/events/ludum-dare/39/the-p-u-r-g-e-protocol"
                }
            ]
        },
        {
            "title": "Niño de Cobre",
            "description": "The \"Niño de Cobre\" project is an Arduino based robot that uses and Android phone as brain. The robot is intended to be autonomos, but orders can be given by using a web console.",
            "thumbnailURL": "img/thumb-nino-de-cobre.jpg",
            "links": [
                {
                    "url": "https://github.com/hhsaez/nicu",
                    "title": "Source Code"
                },
                {
                    "url": "https://www.youtube.com/playlist?list=PLdYfmMNul2m37aqx0T9t8O268GtbwPfNH",
                    "title": "Videos"
                }
            ]
        },
        {
            "title": "DogFighter",
            "description": "An arcade flight combat game developer for iOS.",
            "thumbnailURL": "img/thumb-dogfighter-ios.jpg",
            "links": [
                {
                    "url": "https://itunes.apple.com/us/app/dogfighter-lite/id334095010?l=es&mt=8",
                    "title": "App Store"
                },
                {
                    "url": "https://www.youtube.com/watch?v=jWGbC3Yi650&list=PLdYfmMNul2m0jOt-a_F6F5vOhyejnwQfR",
                    "title": "Videos"
                },
            ]
        },
        {
            "title": "Revancha Zombie",
            "description": "Play as a zombie General Peron in his quest to save the Argentinian people from the hands of the evil Intergalactic Monkey Federation. This game was made in three weeks for the CODEAR challenge.",
            "thumbnailURL": "img/thumb-revancha-zombie.jpg",
            "links": [
                {
                    "url": "https://www.kongregate.com/games/hhsaez/revancha-zombie",
                    "title": "Play (requires Flash)"
                }
            ]            
        }
    ];

    var container = document.getElementById("projects");
    var columnCount = 0;

    var row = document.createElement("div");
    row.classList.add("row");
    row.classList.add("project-row");

    for (var i in projects) {
        var project = projects[i];

        var col = document.createElement("div");
        col.classList.add("col-md-4");

        var title = document.createElement("h2");
        title.classList.add("project-title");
        title.innerText = project.title;
        col.appendChild(title);

        var thumbnail = document.createElement("img");
        thumbnail.classList.add("project-thumb");
        thumbnail.src = project.thumbnailURL;
        col.appendChild(thumbnail);

        var description = document.createElement("p");
        description.classList.add("project-description");
        description.innerText = project.description;
        col.appendChild(description);

        if (project.links) {
            var links = document.createElement("p");
            for (var l in project.links) {
                var linkInfo = project.links[l];

                var link = document.createElement("a");
                link.classList.add("project-button");
                link.href = linkInfo.url;
                link.target = "blank";
                link.innerHTML = "&raquo;&nbsp;" + linkInfo.title;
                links.appendChild(link);
            }
            col.appendChild(links);
        }

        row.appendChild(col);

        ++columnCount;
        if (columnCount >= 3) {
            container.appendChild(row);
            row = document.createElement("div");
            row.classList.add("row");
            row.classList.add("project-row");
            columnCount = 0;
        }
    }

    container.appendChild(row);
}

function populateProjects() {
    var projects = [
        {
            "title": "Crimild Engine",
            "description": "A scene graph based framework for games, simulations and interactive applications.",
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
            ],
            "tag": "crimild",
            "year": 202001,
        },
        {
            "title": "Jägerlied",
            "description": "The first chapter of my new graphic novel is now available online!",
            "thumbnailURL": "img/thumb-jagerlied-00.jpg",
            "links": [
                {
                    "title": "Download PDF (Spanish)",
                    "url": "projects/jagerlied/jagerlied-00.pdf"
                }
            ],
            "tag": "comics",
            "year": 202012,
        },
        {
            "title": "Querida Olivia",
            "description": "A short story about monsters, love and sacrifices. ",
            "thumbnailURL": "img/thumb-querida-olivia.jpg",
            "links": [
                {
                    "title": "Download PDF (Spanish)",
                    "url": "projects/querida_olivia/querida_olivia.pdf"
                }
            ],
            "tag": "comics",
            "year": 202002,
        },
        {
            "title": "Majestic-X",
            "description": "A giant robots fighting game developed in less than 48hs during the Ludum Dare 46 challenge.",
            "thumbnailURL": "img/thumb-majestic-x.png",
            "links": [
                {
                    "title": "Play!",
                    "url": "http://www.hhsaez.com/ld46/"
                },
				{
					"title": "Ludum Dare #46",
					"url": "https://ldjam.com/events/ludum-dare/46/majestic-x"
				},
				{
					"title": "Itch.io",
					"url": "https://hhsaez.itch.io/majestic-x"
				}
            ],
            "tag": "games",
            "year": 202004,
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
            ],
            "tag": "comics",
            "year": 201908,
        },
        {
            "title": "Project: Conquest",
            "description": "\"Project: Conquest\" is a prototype for a casual-type of game where the player needs to improve her base by merging buildings of the same type.",
            "thumbnailURL": "img/thumb-conquest-prototype.jpg",
            "links": [
                {
                    "title": "Play!",
                    "url": "https://hhsaez.github.io/conquest-prototype"
                },
            ],
            "tag": "games",
            "year": 201912,
        },
        {
            "title": "Merge Wars",
            "description": "\"Merge Wars\" is a prototype for a casual-type of game where the player uses merge mechanics to create a base and attack enemies.",
            "thumbnailURL": "img/thumb-merge-wars-prototype.jpg",
            "links": [
                {
                    "title": "Play!",
                    "url": "https://hhsaez.itch.io/merge-wars"
                },
            ],
            "tag": "games",
            "year": 201902,
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
            ],
            "tag": "comics",
            "year": 201812,
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
            ],
            "tag": "games",
            "year": 201804,
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
            ],
            "tag": "games",
            "year": 201805,
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
            ],
            "tag": "games",
            "year": 201601,
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
            ],
            "tag": "games",
            "year": 201709,
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
            ],
            "tag": "games",
            "year": 201704,
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
            ],
            "tag": "robots",
            "year": 201408,
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
            ],
            "tag": "games",
            "year": 200902,
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
            ],
            "tag": "games",
            "year": 201104,
        }
    ];

    var container = document.getElementById("projects");
    var columnCount = 0;

    const addItem = (parent, item) => {
        var col = document.createElement("div");
        col.classList.add("col-md-4");
        col.classList.add("project");

        var title = document.createElement("h2");
        title.classList.add("project-title");
        title.innerText = item.title;
        col.appendChild(title);

        var meta = document.createElement("h3");
        meta.classList.add("project-meta");
        meta.innerText = `${item.tag.toUpperCase()} - ${Math.floor(item.year / 100)}`;
        col.appendChild(meta);

        const thumbnailLink = document.createElement("a");
        thumbnailLink.href = item.links && item.links[0].url;
        thumbnailLink.target = "blank";
        var thumbnail = document.createElement("img");
        thumbnail.classList.add("project-thumb");
        thumbnail.src = item.thumbnailURL;
        thumbnailLink.appendChild(thumbnail);
        col.appendChild(thumbnailLink);

        var description = document.createElement("p");
        description.classList.add("project-description");
        description.innerText = item.description;
        col.appendChild(description);

        if (item.links) {
            var links = document.createElement("p");
            for (var l in item.links) {
                var linkInfo = item.links[l];

                var link = document.createElement("a");
                link.classList.add("project-button");
                link.href = linkInfo.url;
                link.target = "blank";
                link.innerHTML = "&raquo;&nbsp;" + linkInfo.title;
                links.appendChild(link);
            }
            col.appendChild(links);
        }

        parent.appendChild(col);
    };

    const addSection = (parent, sectionTag, projects) => {
        const titleContainer = document.createElement("div");
        titleContainer.classList.add("row");
        titleContainer.classList.add("section-title-row");
        const title = document.createElement("h1");
        title.innerHTML = sectionTag.toUpperCase();
        titleContainer.appendChild(title);
        parent.appendChild(titleContainer);

        const row = document.createElement("div");
        row.classList.add("row");
        row.classList.add("section-row");

        projects.forEach((project) => {
            addItem(row, project);
        });

        parent.appendChild(row);
    };
    
    const sections = projects.reduce((acc, project) => {
        const { tag } = project;
        if (!acc[tag]) {
            acc[tag] = [];
        }
        acc[tag].push(project);
        return acc;
    }, {});

    addSection(container, "latest", [projects[1], projects[2], projects[3]]);

    Object.keys(sections).forEach((tag) => {
        const projects = sections[tag].sort((a, b) => (a.year < b.year) ? 1 : -1);
        
        addSection(container, tag, sections[tag]);
    });
}

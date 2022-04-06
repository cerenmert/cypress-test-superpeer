describe('Playing superpeer.com content', () => {
    it('Go to https://youtube.com/', () => {
        // Set to accept language for disabling Youtube auto-detect
        cy.visit('https://youtube.com/', {
            onBeforeLoad(win) {
                Object.defineProperty(win.navigator, 'language', {value: 'en-US'});
                Object.defineProperty(win.navigator, 'languages', {value: ['en']});
                Object.defineProperty(win.navigator, 'accept_languages', {value: ['en']});
            },
            headers: {
                'Accept-Language': 'en',
            },
        });
    });

    it('Search for “Superpeer”', () => {
        cy.get('input[name="search_query"]').type('Superpeer{enter}');
    });

    it('Click and open "Superpeer\'in kuruluş hikayesi" content', () => {
        cy.contains('Superpeer\'in kuruluş hikayesi').click();
    });

    it('Check the URL', () => {
        cy.url().should('include', '/watch?v=ZNe-TIiLiEI');
    });

    it('Check the title', () => {
        cy.get('h1.title').contains('Superpeer\'in kuruluş hikayesi');
        cy.get('.title .ytd-video-primary-info-renderer').contains('Superpeer\'in kuruluş hikayesi');
    });

    it('Check the video date', () => {
        cy.get('#info-strings').contains('Dec 11, 2020');
    });

    it('Check the video owner', () => {
        cy.get('#text-container.ytd-channel-name').contains('Fatih Acet');
    });

    xit('Video duration is as expected', () => {
        cy.get('.ytp-time-duration').invoke('text').should('be.equal','1:49:51');
    });

    it('Check the comment count visibility and count is greater than 10', () => {
        cy.scrollTo('bottom', {duration: 200}).wait(2000).scrollTo('bottom', {duration: 200})
            .get('div#title  yt-formatted-string > span').first()
            .then(console.log)
            .should('be.visible')
            .invoke('text')
            .then(parseInt).should('be.gt', 10);
    });

    it('Check the author of third comment', () => {
        cy.get('ytd-comment-thread-renderer').eq(3).get('ytd-comment-renderer#comment a#author-text')
            .contains('Senariturk');
    });

    it('check the subscriber count' , () => {
        cy.get('yt-formatted-string#owner-sub-count').invoke('text')
            .then(console.log)
            .then(x => {
                return x.replace('B abone','').replace(',','.').trim();
            })
            .then(console.log)
            .then(parseFloat)
            .then(console.log)
            .then(x => x * 1000)
            .then(console.log)
            .should('be.equal',15100)
    });


    it('Check the video view greater than 100', () => {
        cy.get('#info .view-count').invoke('text')
            .then(x => { return x.replace(' views', '')
                .replace(',', '');})
            .then(parseInt).should('be.gt', 100);
    });

    it('Stop the video', () => {
        cy.wait(2000).get('button.ytp-play-button.ytp-button').click();
    });

    it('Scroll down and check the search bar', () => {
        cy.scrollTo('bottom', {duration: 200});
        cy.get('input[name="search_query"]').should('be.visible')
    });

    it('Select random suggested video and check it', () => {
        cy.get('#items h3').then(x => {
            let videoTitle
            const randomVideoIndex = Math.floor(Math.random() * (x.length - 1));

            cy.get('#items h3')
                .eq(randomVideoIndex)
                .invoke('text')
                .then(y => {
                    videoTitle = y.trim()
                })
                .then(() => {
                    cy.get('#items h3')
                        .eq(randomVideoIndex)
                        .click()
                        .get('h1.title.style-scope.ytd-video-primary-info-renderer')
                        .invoke('text')
                        .should('be.equal', videoTitle);
                });
        });
    });

    it('Button is red and then click on the button, and check the text after click the subscribe button', () => {
        const text = "Want to subscribe to this channel?";
        cy.get('div#subscribe-button > .size-default.style-destructive.style-scope.ytd-video-secondary-info-renderer')
            .should('have.css','background-color','rgb(204, 0, 0)')
            .click()
            .then(() => {
                cy.get('.style-scope.ytd-popup-container > yt-formatted-string#title')
                .invoke('text')
                .should('be.equal', text);
        });
    });


});

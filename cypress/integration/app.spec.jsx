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
    });

    it('Check the video date', () => {
        cy.get('#info-strings').contains('Dec 11, 2020');
    });

    it('Check the video owner', () => {
        cy.get('#text-container.ytd-channel-name').contains('Fatih Acet');
    });

    it('Check the video view greater than 100', () => {
        cy.get('#info .view-count').invoke('text').then(x => {
            return x.replace(' views', '').replace(',', '');
        }).then(parseInt).should('be.gt', 100);
    });

    it('Stop the video', () => {
        cy.get('button.ytp-play-button').click();
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
});
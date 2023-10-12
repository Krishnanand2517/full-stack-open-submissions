describe("Blog app", function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);

    const user1 = {
      name: "Krish",
      username: "kny25",
      password: "testpassword"
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1);

    const user2 = {
      name: "Ezio Auditore",
      username: "ezio",
      password: "requiescat"
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2);

    cy.visit('');
  });

  it("login form is shown", function() {
    cy.contains("Login to the application");
    cy.contains("Login");
  });

  describe("Login", function() {
    it("succeeds with correct credentials", function() {
      cy.get('#username').type("kny25");
      cy.get('#password').type("testpassword");
      cy.get('#login-button').click();

      cy.contains("Krish logged in");
    });

    it("fails with wrong credentials", function() {
      cy.get('#username').type("kny25");
      cy.get('#password').type("wrong password");
      cy.get('#login-button').click();

      cy.get('.message')
        .should('contain', "invalid password or username")
        .and('have.css', 'color', 'rgb(255, 0, 0)');

      cy.get('html').should('not.contain', "Krish logged in");
    });

    describe("When logged in", function() {
      beforeEach(function() {
        cy.login({ username: "kny25", password: "testpassword" });
      });

      it("A blog can be created", function() {
        cy.contains("new note").click();
        cy.get('#blog-title').type("First Blog");
        cy.get('#blog-author').type("Great Man");
        cy.get('#blog-url').type("websiteone.com");

        cy.contains("create").click();
        cy.contains("First Blog by Great Man");
      });

      describe("Several blogs exist", function() {
        beforeEach(function() {
          cy.createBlog({
            title: "First Blog",
            author: "Great Man",
            url: "websiteone.com",
            likes: 40
          });
          cy.createBlog({
            title: "Second Blog",
            author: "Average Animal",
            url: "secondsite.net",
            likes: 93
          });
          cy.createBlog({
            title: "Third Blog",
            author: "Worst Creature",
            url: "something.co.pk",
            likes: 85
          });
        });

        it("A blog can be liked", function() {
          cy.get("#view-button").click();
          cy.contains("likes 93");

          cy.get("#like-button").click();
          cy.contains("likes 94");
        });

        it("A blog can be deleted", function() {
          cy.get("#view-button").click();
          cy.get('html').should('contain', "Second Blog by Average Animal");

          cy.get('#remove-button').click();
          cy.get('html').should('not.contain', "Second Blog by Average Animal");
        });

        it("Only the creator can see delete button", function() {
          cy.get("#view-button").click();
          cy.get('#remove-button');
          cy.get('#logout-button');

          cy.login({ username: "ezio", password: "requiescat" });
          cy.get("#view-button").click();
          cy.get('#remove-button').should('not.exist');
        });

        it("Blogs are ordered according to most likes", function() {
          cy.get('.blog').eq(0).should('contain', "Second Blog by Average Animal");
          cy.get('.blog').eq(1).should('contain', "Third Blog by Worst Creature");
          cy.get('.blog').eq(2).should('contain', "First Blog by Great Man");
        });
      });
    });
  });
});
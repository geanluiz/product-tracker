# 🛒Product Tracker

### Video Demo:
<p align="center">
    <a href="https://youtu.be/5Qu6BRT-JRI"><img alt="Video demo https://youtu.be/5Qu6BRT-JRI" src="https://img.youtube.com/vi/5Qu6BRT-JRI/maxresdefault.jpg" style="width: 600px"></a>
</p>

## ℹ️ Introduction
Product Tracker is a web app created for checking how long groceries usually lasts for you, so you can plan when to buy it again.\
The idea came from a need I had in my family as I wanted to plan the monthly visits to the grocery store, so that each one would be more concise and less frequent.

I used HTML, CSS with Bootstrap, Javascript, Python with Flask and SQLite with SqlAlchemy in my project.
Started of by the design so I drew in figma how I wanted it to look, then used [zzzcode](https://zzzcode.ai/html/code-generator) to generate the structure in HTML and CSS (as per my commits in December 10 and 12), but then proceeded to alter it to my liking

## 📂 Files
### Templates
Starting of from the templates folder we have _layout.html_ which holds the main structure for all the other pages with bootstrap and google fonts imports and some styling.

### Index
In _index.html_ we have the main page of the app, containing a sidebar, the details of the selected product and the history of previous purchases.
 - The sidebar contains a form in which the user can add a new product purchase inserting its name, category, price and the date that item was bought.\
There's also room for some alerts and the user options at the bottom.
 - In the product details we have its name, category and price in the selected purchase and the main goal of the app, the average number of days between each entry of said product.
 - Finally there's the history table that shows each entries product name, category, the date and the price for that purchase and a edit button that calls a bootstrap modal box on which the user can edit the entries data as needed, or delete it completly.

I've decided to create _modal.html_ to hold all of the content of the modal itself separately so that it can be fetched with javascript and then contain the current data from the product. That way users don't need to enter all the data just to change a little detail.

When the user clicks an entry, the product is selected. Its information is shown in the >Product details section and the other entries of the same item are filtered in the history.

### Apology
The template _apology.html_ returns errors at the user input, such as when the user didn't insert its correct username and password or when passwords don't match while registering.

### Authentication
For _login.html_, _register.html_, _password.html_ and _delete_acc.html_ they all follow the same design but, in _delete_acc.html_ I've added a confirmation modal as it holds a critical operation.

### Javascript
In static's folder we have _script.js_, that handles the logic for calling the modal box with the current data for the entry and additionally the dynamic for exhibiting user password when he is at the authentication pages.

## 🛣️ Flask routes
_app.py_ contains the functions and routes below. I started by configuring the flask app and sessions as per _finance_ problem set and sql integration via sqlalchemy.

### Formatting
Two functions, _usd_ and _date_format_, are in charge of formatting currencies and dates. In de database dates and currencies are stored as integers, so that the program can manipulate them easily. Those functions are then exported via jinja and used to present these data in the UI.

### User
Next comes the login route function and a wrapper function that later makes possible to require login for some of the following routes.

Then a simple logout function.

A register route, that checks if the user entered a username and a password, checks if the username is avaliable and if password and confirmation match. If so, it inserts the user in the db and also logs the user automatically redirecting him with a flash message.

A function for changing the user password, that is very similar to the register function, but updates the password hash instead of inserting the user.

And a function that deletes the user account, which is also similar to registering but in this case delete its entry in the db and because of the _on delete cascade_ constraint in the history table, also deletes all of the user's products entries.

### Business rules
The index route loads all categories inserted in the database along with the history of purchases according to the user that is current logged in, and return this information and the username to the main page.

The route for adding a new product also fetchs the products history then checks if product is already registered in the _items_ table. If so, it uses this information, if not, it inserts the product and the category, if needed. This way the user has the default categories to use and is also able to create new categories.

After that, there's a function for editing the product entry, which gets the selected product info and returns to the modal box.\
Then, after the user inputs his changes, it checks if there was a change in the name or category of the product. In this case, it will create another record for this 'new' product. It then takes the other inputs from the user and makes an update in the db if it's the same item or inserts a new item, deleting the previous from the history.\
I chose to delete it, because the alternatives like 'upsert' were too complicated in cases where the user changes different numbers of details.

_delete_product_ simply takes the history id from passed by the form, and deletes the corresponding item from it.

Finally the _product_ route returns categories, history entries, the username and the average number of days of the selected product to the main page.

## Database
In _products.db_ I created 4 tables: users, categories, items and history with each columns as below.

- users: users ids, usernames and passwords
- categories: categories ids and names
- items: items ids, items names and category id
- history: entry id, user id, item id, date of transaction and price

In _items_, the category id references the categories table and in _history_, user id and item id references users table and items table respectively

## 📋 Roadmap
- [x] Add items
- [x] Return average days
- [x] Alow multiple users
- [x] Edit items
- [x] Delete items
- [x] Change password
- [x] Delete account
- [ ] Reset password
- [ ] Product images
- [ ] Price chart
- [ ] Category/price chart
- [ ] Search bar
- [ ] Edit categories
- [ ] Partner sharing

<br>
This was CS50x!

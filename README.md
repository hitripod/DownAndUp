## Quick Start
### Getting the code
~~~sh
$ git clone https://github.com/hitripod/DownAndUp.git && cd ./DownAndUp.git/
~~~

### Developing
Enter `grunt` or `node server` and the server is started at port 8000 as default. ([http://localhost:8000](http://localhost:8000))

### Deploying to heroku
~~~sh
$ heroku login
$ heroku create down-and-up
$ git remote add heroku git@heroku.com:down-and-up.git
$ foreman start
$ git push heroku master
~~~

## Demo
http://down-and-up.herokuapp.com/

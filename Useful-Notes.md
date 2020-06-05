Build our Dockerfile:
`docker build -t epierson/harness:1.0.0 .`

 After building a container you need to run it:
`docker run -i epierson/harness:1.0.0`

 If you are actively developing a docker image you will end up creating a lot of images that you don't need! Use this to delete them.
 `docker rmi $(docker images -f "dangling=true" -q)`

Once an image is up and running you can jump into it by using a command like this:
`docker exec -i $runnibng_container ./bin/bash`
NOTE: The app also works.

Docker command  

docker build -t user-token:local-v1 .

 XXX docker run -p 3053:6000  --name user-token -d user-token:local-v1


 docker run -p 3053:3053  --name user-token -d user-token:local-v1


 docker run -p 3053:3053 -e NODE_ENV=development -e NODE_ENV_APP=banco-cl-v2  --name user-token -d user-token:local-v1 


docker run -p 6000:3053  --name user-token-v1 -d user-token:local-v1



 docker exec -it <container id> /bin/bash

 docker exec -it <container id> sh

 watch 'docker logs user-token'

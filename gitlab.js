# requiring the environment of NodeJS 8.9.x LTS (carbon)
image: node:8.9

# add 'node_modules' to cache for speeding up builds
cache:
  paths:
    - node_modules/ # Node modules and dependencies

before_script:
  - npm install gitbook-cli -g # install gitbook
  - gitbook fetch latest # fetch latest stable version
  - gitbook install # add any requested plugins in book.json
  #- gitbook fetch pre # fetch latest pre-release version
  #- gitbook fetch 2.6.7 # fetch specific version

# the 'pages' job will deploy and build your site to the 'public' path
pages:
  stage: deploy
  script:
    - gitbook build . public # build to public path
  artifacts:
    paths:
      - public
  only:
    - master # this job will affect only the 'master' branch

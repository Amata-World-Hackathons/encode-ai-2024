# Project ARk

## Technical Implementation

There are 4 main components to the application:

- The Frontend is built using React and NextJS and powered by a GraphQL API
- The API is written in Python, powered by FastAPI
- Celery task runner is used to manage async tasks using Redis as the broker
- TripoSR is run straight from the repo provided as a separate process managed
  by Celery

The commands you might need:

```
# FE
bun run dev

# BE 1
uvicorn main:app

# BE 2
celery -A tasks worker --concurrency=1 # optional, but keeps things in check while running the LLMs
```


## Future considerations

- Embedding the LLM in the FE was not complete, loading the model could not be
  done reliably on a mobile connection. This would take advantage of the name
  and backstory information provided
- The basic navigation of the website exists, but most pages are empty. This
  needs to be filled out for a full experience
- Integration with the Stability AI API for things like image-to-image, or
  image-to-video which could do a lot more to bring the character to life
- A text-to-voice integration to narrate or voice over the character
- Finish dockerizing the whole app
# React App for automatic literacy and speech assessment

Demo: https://huggingface.co/spaces/RobPruzan/automaticlitassesment

**Reading Difficulty**-  Automatically determining how difficult something is to read is a difficult task as underlying 
                 semantics are relevant. To efficiently compute text difficulty, a Distil-RoBERTa pre-trained model is fine-tuned for regression 
                 using The CommonLit Ease of Readability (CLEAR) Corpus. This model scores the text on how difficult it would be for a student
                 to understand. This model is trained end-end (regression layer down to the first attention layer to ensure the best performance- 
                 Merchant et al. 2020)
 
![image](https://user-images.githubusercontent.com/97781863/183447368-c2738b41-d6e2-40bd-8f74-99c09e3e5054.png)


**Lexical Diversity**-  The lexical diversity score is computed by taking the ratio of unique similar words to total similar words 
                  squared. The similarity is computed as if the cosine similarity of the word2vec embeddings is greater than .75. It is bad writing/speech 
                  practice to repeat the same words when it's possible not to. Vocabulary diversity is generally computed by taking the ratio of unique 
                  strings/ total strings. This does not give an indication if the person has a large vocabulary or if the topic does not require a diverse 
                  vocabulary to express it. This custom algorithm only scores the text based on how many times a unique word was chosen for a semantic idea, e.g., 
                  "Forest" and "Trees" are 2 words to represent one semantic idea, so this would receive a 100% lexical diversity score, vs using the word
                  "Forest" twice would yield you a 25% diversity score, (1 unique word/ 2 total words)^2
                  
<img width="691" alt="image" src="https://user-images.githubusercontent.com/97781863/209993956-2d92cf0b-516f-4634-8313-e09f86e4c9ad.png">


                                  
**Speech Pronunciation Scoring-**-  The Wave2Vec 2.0 model is utilized to convert audio into text in real-time. The model predicts words or phonemes
                  (smallest unit of speech distinguishing one word (or word element) from another) from the input audio from the user. Due to the nature 
                  of the model, users with poor pronunciation get inaccurate results. This project attempts to score pronunciation by asking a user to read 
                  a target excerpt into the  microphone. We then pass this audio through Wave2Vec to get the inferred intended words. We measure the loss as 
                  the Levenshtein distance between the target and actual transcripts- the Levenshtein distance between two words is the minimum number of single-                         character edits required to change one word into the other.

**Synonym Generation**- To automaically generate reading-level based synoynms, word occurence statistics are calculated in different levels of reading
                   (defined by the fine-tuned DistilBert model). Based on those statistics we can derive what words are most likely to occur in different levels
                   of reading. To generate synoynms, the WordNet lexical database is used, which are then catarogized by the word occurence statistics and reccomended
                  

## Getting Started
### Prerequisites
Before you begin, make sure you have the following software installed on your computer:

Python 3.6 or newer
Node.js 12 or newer
### Installation
1. To get started, clone the repository OR create a new repository with this repository imported 
2. Navigate to the root directory:

### Database 
Install neccesary dependencies for django postgres intergration (using brew)
- If you don't have/use brew, head over to the postgres docs and install the latest version for your machine/OS, and refer to it for commands on how to start/stop/restart the server- https://www.postgresql.org/docs/ 
```
brew install postgresql
```
Start up postgres
```
brew services start postgresql
```
Create db
```
createdb <db_name>
```
Create user and password
```
psql <db_name>
<db_name>=# CREATE USER <user> WITH PASSWORD '<password>'
<db_name>=# GRANT ALL PRIVILEGES ON DATABASE <db_name> TO <user>;
```
To confirm the role exists run the following commands and the role should appear
```
psql <db_name>
\du
```
Next, install the Python dependencies (if you have a virtual enviornment, now is when you should turn it on):


```bash
cd backend
pip install -r requirements.txt
```
This will install all the necessary Python packages, including Django and the Django Rest Framework.


Next, install the Node.js dependencies:


```bash
cd ..
cd web
npm install
```
This will install all the necessary Node.js packages, including Redux, React-query, Tailwind CSS, MaterialUI, and the Redux DevTools.
## Django X Postgres
We need to connect django to our Postrgres DB

To do this navigate to local_settings.py (this is located in the backend directory, right under the root directory of the project)

Within local_settings.py place your DB information used earlier to create your DB
```
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "<db_name>",
        "USER": "<user_name>",
        "PASSWORD": "<password>",
        "HOST": "localhost",
        "PORT": "5432",
    }
}
```

## Migrations
Next, you'll need to run the Django migrations to create the necessary database tables:


```bash
python3 manage.py makemigrations
python3 manage.py migrate
```
## Running the Server
To start the Django development server, run the following command:


```bash
python3 manage.py runserver
```
This will start the server at http://localhost:8000/.

To start the React development server, run the following command in a separate terminal window:


```bash
npm run start
```

You can now access the application at http://localhost:3000/. Any changes you make to the code will automatically be reflected in the browser.

## Debugging with Redux DevTools
To debug the Redux store, you can use the Redux DevTools extension for your browser. This extension allows you to see the state of the store at any point in time, and to revert back to previous states if necessary. Make sure to download the redux extension from the chrome extension store for free.
![image](https://user-images.githubusercontent.com/97781863/208782727-cd700ac6-c138-4688-b863-c02585123eaf.png)
## Debugging with react-query
React-querys devtools is implemented as a component, so no install is required to start debugging! You should see a flower at the bottom left of your page, and when clicking, this panel should show
![image](https://user-images.githubusercontent.com/97781863/209912435-927598a9-4a6f-488c-be29-01025409cb68.png)

                

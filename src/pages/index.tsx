import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, type SyntheticEvent } from "react";

import { api } from "~/utils/api";
import Navbar from "~/components/navbar";

const Home: NextPage = () => {
  const questions = api.questions.getAll.useQuery();
  const rounds = api.rounds.getAll.useQuery();
  const myQuestions = api.questions.getMine.useQuery();
  const myRounds = api.rounds.getMine.useQuery();

  return (
    <>
      <Head>
        <title>Scibowl Nexus</title>
        <meta name="description" content="omg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar active="home"/>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {/* <div className="flex flex-col items-center gap-2">
            <SignInButton />
          </div> */}
          <div className="flex flex-col items-center gap-2 text-white">
          <Link href="/api/questions">QUESTIONS:</Link>
            <div className="container h-24 w-96 items-center justify-center overflow-scroll border">
              <pre className="break-word overflow-x-auto text-sm text-white">
              {questions.data
                  ? JSON.stringify(
                      { all: questions.data, mine: myQuestions.data },
                      null,
                      2
                    )
                  : "Loading questions..."}
              </pre>
            </div>
            <Link href="/api/rounds">ROUNDS:</Link>
            <div className="container h-24 w-96 items-center justify-center overflow-scroll border">
              <pre className="break-word overflow-x-auto text-sm text-white">
                {rounds.data
                  ? JSON.stringify(
                      { all: rounds.data, mine: myRounds.data },
                      null,
                      2
                    )
                  : "Loading rounds..."}
              </pre>
            </div>
            {/* <AddQuestion /> */}
            <UploadRound />
            <AddQuestion />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

/*const AddQuestion: React.FC = () => {
  const [value, setValue] = useState("");
  const mutation = api.questions.create.useMutation();

  return (
    <form>
      <input
        type="text"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      ></input>
      <input
        type="button"
        value="OOH LA LA"
        onClick={() => {
          mutation.mutate({
            tossUp: value,
          });
        }}
      ></input>
    </form>
  );
};*/

const AddQuestion: React.FC = () => {
  const [questionInfo, setQuestionInfo] = useState({
    category: "",
    tossUpFormat: "",
    tossUpQuestion: "",
    tossUpAnswer: "",
    bonusFormat: "",
    bonusQuestion: "",
    bonusAnswer: "",
    source: "",
  });

  const handleChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setQuestionInfo({ ...questionInfo, [target.name]: target.value });
  };

  const mutation = api.questions.create.useMutation();

  return (
    <form className="flex flex-col">
      <h1 className="font-extrabold text-3xl mb-4">Submit Question:</h1>
      {
        Object.keys(questionInfo).map((key, idx) => {
            return <>{key}: <input className="text-black mt-2 mb-4" type="text" name={key} key={idx} onChange={handleChange} required></input></>
        })
      }
      <input
        type="submit"
        value="Submit"
        onClick={e => {
          // e.preventDefault(); 
          mutation.mutate(questionInfo);
        }}
      ></input>
    </form>
  );
};

const UploadRound: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className={"flex justify-center"}>
      {sessionData && (
        <form
          action="/api/rounds/upload"
          method="post"
          encType="multipart/form-data"
        >
          <input id="file" name="file" type="file" />
          <input
            className={"rounded p-1"}
            id="source"
            type="text"
            name="source"
            placeholder="source"
          />{" "}
          <input
            className={"rounded bg-slate-600 py-0.5 px-1"}
            type="submit"
            value={"Submit"}
          />
        </form>
      )}
    </div>
  );
};

const SignInButton: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {/*secretMessage && <span> - {secretMessage}</span>*/}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

const T3AppDefault: React.FC = () => {
  return (
    <div>
      <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
          href="https://create.t3.gg/en/usage/first-steps"
          target="_blank"
          legacyBehavior>
          <h3 className="text-2xl font-bold">First Steps →</h3>
          <div className="text-lg">
            Just the basics - Everything you need to know to set up your
            database and authentication.
          </div>
        </Link>
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
          href="https://create.t3.gg/en/introduction"
          target="_blank"
          legacyBehavior>
          <h3 className="text-2xl font-bold">Documentation →</h3>
          <div className="text-lg">
            Learn more about Create T3 App, the libraries it uses, and how to
            deploy it.
          </div>
        </Link>
      </div>
    </div>
  );
};

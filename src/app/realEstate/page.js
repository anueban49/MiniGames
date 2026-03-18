import { Children } from "react";
import Link from "next/link";

// import Image from "next/image";
const Button = ({ text }) => {
  return (
    <>
      <button className=" rounded-lg bg-orange-400 px-8 py-3 text-white">
        {text}
      </button>
    </>
  );
};
const Page = ({ children }) => {
  return (
    <>
      <div className="w-full h-full flex flex-col items-center gap-10">
        {children}
      </div>
    </>
  );
};
const Cards = ({ children }) => {
  return (
    <div>
      <div className="flex flex-col items-center gap-9 p-6 justify-center border-2 border-gray-200 rounded-lg">
        {children}
      </div>
    </div>
  );
};
const Num = ({ children }) => {
  return (
    <div className="w-10 h-10 border-amber-500 border-2 rounded-4xl text-amber-500 flex items-center justify-center">
      {children}
    </div>
  );
};
const InfoBox = ({ children }) => {
  return (
    <div className="flex-1 p-5 gap-8 flex flex-row">
      <div>{children}</div>
    </div>
  );
};

const PropertyCard = ({ image, price, location, bed, bath, size }) => {
  return (
    <>
      <div className="m-4 rounded-x3 grid grid-rows-2 overflow-clip">
        <div className="w-[400px] h-[200px] overflow-y-hidden bg-clip-content">
          {image}
        </div>
        <div className="p-4 flex flex-col ">
          <span className="text-orange-500">${price}</span>
          <span className="text-black">{location}</span>
          <span>
            <p>{bed} Bedrooms</p>
          </span>
          <span>
            <p>{bath} Bathroom</p>
          </span>
          <span>
            <p>{size} sqft</p>
          </span>
        </div>
      </div>
    </>
  );
};
const Agent = ({ profile, agentname, job, mileage }) => {
  return (
    <>
      <div className="h-[390px] flex flex-col justify-center">
        <div className="aspect-square overflow-clip">{profile}</div>
        <span>
          <h3>{agentname}</h3>
        </span>
        <span>
          <p>{job}</p>
        </span>
        <span className="text-orange-500 text-sm">{mileage}</span>
      </div>
    </>
  );
};
const HomePage = () => {
  return (
    <>
    <div>
      <Link href="/tictactoe">Tic Tac Toe</Link>
    </div>
      <div>
        <Link href="/todo">To-Do task</Link>
      </div>
      <div>
        <Link href="/movies">Movies</Link>
      </div>
            <div>
        <Link href="/moviedynamic">Dynamic Movie Page</Link>
      </div>
      <main className="flex flex-col items-center px-4 py-16 gap-10">
        <Page>
          <div className="flex flex-col items-center">
            <h>Smart Tools</h>
            <h>Real Experts, Easy Moves</h>
            <p>Your journey to finding the perfect home starts here</p>{" "}
          </div>
          <div className=" w-full h-full grid grid-cols-3 gap-6">
            <Cards>
              <img src="./public/App.pmg"></img>
              <h3>Top-End Curation</h3>
              <p>Carefully selected properties that meet our high s</p>
            </Cards>
            <Cards>
              <img src="./public/App.pmg"></img>
              <h3>Top-End Curation</h3>
              <p>Carefully selected properties that meet our high s</p>
            </Cards>
            <Cards>
              <img src="./public/App.pmg"></img>
              <h3>Top-End Curation</h3>
              <p>Carefully selected properties that meet our high s</p>
            </Cards>
          </div>
          <Button text="Get Started" />
        </Page>
        <Page>
          <div>
            <h2>
              Buying doesn't have to <br /> Be overwhelming
            </h2>
          </div>
          <div className="w-full h-full grid grid-cols-2 gap-8">
            <InfoBox>
              <Num>1</Num>
              <h3>Browse Curated Homes</h3>
              <p>
                Explore our carefully selected collection of properties that
                match your lifestyle and budget. Every listing is verified and
                includes detailed information.
              </p>
            </InfoBox>
            <InfoBox>
              <Num>1</Num>
              <h3>Browse Curated Homes</h3>
              <p>
                Explore our carefully selected collection of properties that
                match your lifestyle and budget. Every listing is verified and
                includes detailed information.
              </p>
            </InfoBox>
            <InfoBox>
              <Num>1</Num>
              <h3>Browse Curated Homes</h3>
              <p>
                Explore our carefully selected collection of properties that
                match your lifestyle and budget. Every listing is verified and
                includes detailed information.
              </p>
            </InfoBox>
            <InfoBox>
              <Num>1</Num>
              <h3>Browse Curated Homes</h3>
              <p>
                Explore our carefully selected collection of properties that
                match your lifestyle and budget. Every listing is verified and
                includes detailed information.
              </p>
            </InfoBox>
          </div>
        </Page>
        <Page>
          <h3>Explore Properties</h3>
          <div id="sort" className="w-full h-3"></div>
          <div className="ga-4 w-full h-full grid grid-cols-3 grid-rows-2">
            <PropertyCard
              image={<img src="/property1.jpg" />}
              price={216000}
              location={"Piney Hills"}
              bed={4}
              bath={2}
              size={2150}
            />
            <PropertyCard
              image={<img src="/property1.jpg" />}
              price={216000}
              location={"Piney Hills"}
              bed={4}
              bath={2}
              size={2150}
            />
            <PropertyCard
              image={<img src="/property1.jpg" />}
              price={216000}
              location={"Piney Hills"}
              bed={4}
              bath={2}
              size={2150}
            />
            <PropertyCard
              image={<img src="/property1.jpg" />}
              price={216000}
              location={"Piney Hills"}
              bed={4}
              bath={2}
              size={2150}
            />
            <PropertyCard
              image={<img src="/property1.jpg" />}
              price={216000}
              location={"Piney Hills"}
              bed={4}
              bath={2}
              size={2150}
            />
            <PropertyCard
              image={<img src="/property1.jpg" />}
              price={216000}
              location={"Piney Hills"}
              bed={4}
              bath={2}
              size={2150}
            />
          </div>
          <Button text="Load More Listings" />
        </Page>
        <Page>
          <h>
            Meet more people <br /> Behind the process
          </h>
          <p>Our experienced team is dedicated to helping you</p>
          <div className="grid grid-cols-4 gap-4">
            <Agent
              profile={<img src="/agent1.jpg" />}
              agentname={"Micheal Chen"}
              job={"Senior real estate agent"}
              mileage={"20 properties sold"}
            />
            <Agent
              profile={<img src="/agent1.jpg" />}
              agentname={"Micheal Chen"}
              job={"Senior real estate agent"}
              mileage={"20 properties sold"}
            />
            <Agent
              profile={<img src="/agent1.jpg" />}
              agentname={"Micheal Chen"}
              job={"Senior real estate agent"}
              mileage={"20 properties sold"}
            />
            <Agent
              profile={<img src="/agent1.jpg" />}
              agentname={"Micheal Chen"}
              job={"Senior real estate agent"}
              mileage={"20 properties sold"}
            />
          </div>
          <Button text="Meet the Team"/>
        </Page>
        <Page>
          <div></div>
          <div></div>
        </Page>
        <Page></Page>
        <Page></Page>
      </main>
    </>
  );
};

export default HomePage;

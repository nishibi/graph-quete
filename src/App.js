import logo from "./logo.svg";
import "./App.css";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { useQuery, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: gql`
//       query GetRates {
//         rates(currency: "USD") {
//           currency
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));

// const EXCHANGE_RATES = gql`
//   query GetExchangeRates {
//     rates(currency: "USD") {
//       currency
//       rate
//     }
//   }
// `;
const GET_LAUNCHES = gql`
  query GetLunches {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
`;

// function ExchangeRates() {
//   const { loading, error, data } = useQuery(EXCHANGE_RATES);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :(</p>;

//   return data.rates.map(({ currency, rate }) => (
//     <div key={currency}>
//       <p>
//         {currency}: {rate}
//       </p>
//     </div>
//   ));
// }

function FiveLaunches() {
  const { loading, error, data } = useQuery(GET_LAUNCHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.launches.map((value, key) => {
        let successMessage = "";
        if (value.launch_success) {
          successMessage = "Success !";
        } else {
          successMessage = "Failed :(";
        }
        return (
          <div>
            <h2>{value.rocket.rocket_name}</h2>
            <h3>
              The launch from {value.launch_date_utc} is {successMessage}
            </h3>
            <p>{value.details}</p>
            <p>
              View the launch <a href={value.links.video_link}>HERE</a>
            </p>
          </div>
        );
      })}
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo app 🚀</h2>
      </div>
      <FiveLaunches />
    </ApolloProvider>
  );
}

export default App;

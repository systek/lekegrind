using no.systek.lekegrind.backend.Repository;
using System;
using TechTalk.SpecFlow;

namespace no.systek.lekegrind.backend.test
{
    [Binding]
    public class GetUserSteps
    {
        [Given(@"user (.*) exists in the database")]
        public void GivenUserExistsInTheDatabase(int p0)
        {
            IUserRepository rep = new UserRepository(null, "test");

            rep.RemoveAll();


        }

        [When(@"http get api/User/(.*) is called")]
        public void WhenHttpGetApiUserIsCalled(int p0)
        {
            ScenarioContext.Current.Pending();
        }

        [Then(@"the service should return")]
        public void ThenTheServiceShouldReturn(Table table)
        {
            ScenarioContext.Current.Pending();
        }
    }
}

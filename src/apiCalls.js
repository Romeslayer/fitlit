// Your fetch requests will live here!
const getData = (fetchAPI) => {
  return fetch(`http://localhost:3001/api/v1/${fetchAPI}`)
    .then(response => response.json());
}

const postData = (fetchAPI, formData) => {
  return fetch(`http://localhost:3001/api/v1/${fetchAPI}`,
    {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if !response.ok throw new Error('Please fill out all fields.')
    return reponse.json()
  })
  .catch(e => console.log(e))
}
const usersData = getData('users');
const sleepData = getData('sleep');
const activityData = getData('activity');
const hydrationData = getData('hydration');

export {
  usersData,
  sleepData,
  activityData,
  hydrationData,
  getData,
  postData
};

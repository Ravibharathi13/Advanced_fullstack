# TODO: Fix Connections and Errors in Food_app

## Backend Fixes (Food_app/Backend/index.js)
- [ ] Fix missing semicolon in PUT /update route
- [ ] Change field names in destructuring and model to match frontend (foodname, days)
- [ ] Update PUT route to use newFoodname and correct endpoint

## Backend Model Fixes (Food_app/Backend/models/Food.js)
- [ ] Change schema fields from foodName/daysSinceIAte to foodname/days

## Frontend Fixes (Food_app/foodapp_client/src/App.jsx)
- [ ] Fix useEffect dependency to prevent infinite re-renders
- [ ] Add error handling for API calls
- [ ] Update updateFood function to use correct endpoint and field names
- [ ] Ensure field names in state and API calls match backend

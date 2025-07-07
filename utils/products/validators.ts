export function validateReview(values: {
  title?: string;
  description?: string;
  rating?: string;
}) {
  const errors: { title?: string; description?: string, rating?: string } = {};

  if (!values.title) {
    errors.title = "Title is required.";
  } else if (values.title.length > 100) {
    errors.title = "Title must be less than 100 characters.";
  }

  if (!values.description) {
    errors.description = "Description is required.";
  } else if (values.description.length > 5000) {
    errors.description = "Description must be less than 5000 characters.";
  }

  if (!values.rating) {
    errors.rating = "Rating is required.";
  } else if (parseInt(values.rating) < 0 || parseInt(values.rating) > 5) {
    errors.rating = "Rating must be 1, 2, 3, 4 or 5.";
  }

  return errors;
}

export function validateBio(values: {
  bio?: string;
}) {
  const errors: { bio?: string } = {};

  if (!values.bio) {
    errors.bio = "B is required.";
  } else if (values.bio.length > 1500) {
    errors.bio = "Title must be less than 1500 characters.";
  }
  return errors;
}

/**
 * Portfolio contact form → Gmail
 * ---------------------------------------------------------------------------
 * Emails you every time someone submits the contact form on the portfolio,
 * with Reply-To set to the sender so you can just hit Reply in Gmail.
 *
 * This is a FORM-BOUND script — it reads e.response, so no linked Sheet is
 * needed. Responses are still kept in the form's Responses tab as a backup.
 *
 * SETUP
 *  1. Open the form: https://docs.google.com/forms/d/e/1FAIpQLSdbONxGPbK7NW3m5p84MU5ftMiyfMhxEG-b9W1pVAeCCysjIw/viewform
 *     -> switch to edit mode -> three-dot menu (top right) -> "Script editor".
 *  2. Delete the placeholder myFunction() and paste this whole file. Save.
 *  3. Left sidebar -> Triggers (alarm clock icon) -> "Add Trigger":
 *       Function .............. onFormSubmit
 *       Event source .......... From form
 *       Event type ............ On form submit
 *     Save, then approve the permission prompt (choose your account ->
 *     Advanced -> "Go to <project> (unsafe)" -> Allow. It is your own script;
 *     Google marks every unverified personal script this way).
 *  4. Submit a test message from the site and check your inbox.
 *
 * Free quota is 100 emails/day, far beyond what a portfolio will see.
 */

var RECIPIENT = 'nanubanshival@gmail.com';

// Question titles in the form. Change these if you rename a question.
var FIELD_NAME = 'Name';
var FIELD_EMAIL = 'Email';
var FIELD_MESSAGE = 'Message';

function onFormSubmit(e) {
  if (!e || !e.response) {
    throw new Error(
      'No form response in the event. Do not press Run manually — this function ' +
      'is meant to fire from the "On form submit" trigger.'
    );
  }

  var answers = readAnswers_(e.response);

  var name = answers[FIELD_NAME] || 'Someone';
  var email = (answers[FIELD_EMAIL] || '').trim();
  var message = answers[FIELD_MESSAGE] || '(no message)';
  var when = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'd MMM yyyy, HH:mm');

  var options = {
    to: RECIPIENT,
    subject: 'Portfolio: ' + name,
    body:
      message + '\n\n' +
      '-- \n' +
      name + ' <' + email + '>\n' +
      'Sent from the portfolio contact form, ' + when,
    name: 'Portfolio contact form',
  };

  // Gmail rejects a malformed Reply-To, so only set it when it looks real.
  if (isEmail_(email)) {
    options.replyTo = email;
  }

  MailApp.sendEmail(options);
}

/** Maps the response into { questionTitle: answer }. */
function readAnswers_(response) {
  var out = {};
  var items = response.getItemResponses();
  for (var i = 0; i < items.length; i++) {
    var value = items[i].getResponse();
    out[items[i].getItem().getTitle()] = Array.isArray(value) ? value.join(', ') : value;
  }
  return out;
}

function isEmail_(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

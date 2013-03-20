/*
$('#fb-root').click(function() {
	
});
*/

function login() {
    FB.login(function(response) {
        if (response.authResponse) {
            // connected
            fbAPI();
            alert('Won\'t you pay any attention :(');
        } else {
            alert('Won\'t you pay any attention :(');
        }
    });
}

function fbAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Good to see you, ' + response.name + '.');
    });
}
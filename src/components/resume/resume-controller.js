'use strict';

/* eslint no-implicit-coercion: "off", max-len: "off" */

module.exports = function($scope, $routeParams) {
  var moment = require('moment');

  // Enable the pills (tabs) functionality
  $('.nav-pills a').click(function(e) {
    e.preventDefault();
    $(this).tab('show');
  });

  $scope.getDateString = function(date) {
    if (!date) {
      return 'Present';
    }
    return moment(date).format('MMM YYYY');
  };

  $scope.getDuration = function(startDate, endDate) {
    var end;
    if (endDate) {
      end = moment(endDate);
    } else {
      end = moment();
    }
    var duration = moment.duration(end.diff(startDate));
    var years = duration.years();
    var months = duration.months() + 1;
    var result = '';
    if (years) {
      result = years + ' years';
    }
    if (months) {
      if (result) {
        result += ' ';
      }
      result += months + ' months';
    }
    return result;
  };

  $scope.jobs = [
    {
      title: 'Team Lead, Software Engineer',
      company: 'Wayfair',
      startDate: '2013-08-01',
      endDate: null,
      description: "" +
"<p>As the tech lead of a team of software engineers, I am helping Wayfair transform into a global company. I am responsible for building a flexible, extensive localization framework that is used by hundreds of engineers. Additionally, I work closely with business stakeholders to identify and prioritize my team’s engineering work and ensure we are furthering business initiatives. Since March 2016 I have also served as the functional manager for my team.</p>" +
"<p>Projects include:</p>" +
"<ul>" +
"  <li>Building an automated process for the translation of customer-facing data into different languages.</li>" +
"  <li>Integrating with a third party, Smartling, using their RESTful API to send and receive data for manual translation.</li>" +
"  <li>Developing internal and customer-facing web apps using Wayfair’s Tungsten.js and Backbone.</li>" +
"  <li>Writing dynamic SQL used for the code generation of localized database tables and functions.</li>" +
"  <li>Creating generic PHP classes that are used for all operations against the localized tables, including asynchronous actions that need to be triggered when any data is modified, such as logging and synchronization.</li>" +
"  <li>Creating a system for tracking the translation status of data, including automatic flagging for re-translation.</li>" +
"</ul>" +
"<p>Other tasks include: Mentoring new hires and interns, reviewing others’ code, interviewing candidates, giving employee performance reviews, and participating in Wayfair’s Emerging Manager training program</p>" +
"<p>Primary technologies: PHP, C#.NET, Javascript (Backbone, jQuery), MS SQL, WCF, Git</p>"
    },
    {
      title: 'Senior Software Engineer',
      company: 'Blackbaud',
      startDate: '2010-05-01',
      endDate: '2013-08-01',
      description: "" +
"<p>I worked on feature development for our CRM applications on the web and Windows. I worked on all layers of the tech stack on a geographically dispersed agile team managing both new and production software.</p>" +
"<p>Projects included:</p>" +
"<ul>" +
"  <li>Building bidirectional data synchronization between .NET and Java applications when Blackbaud acquired a competitor, Convio. This work included creating a WCF web service to communicate with a message queueing service bus, UIs for review of data, and deployment components.</li>" +
"  <li>Developing web services that powered Blackbaud’s Android and iOS apps.</li>" +
"  <li>Adding new features to Blackbaud’s web and desktop CRM applications, including fuzzy search capability, data de-duplication, a generic query builder user interface, and dashboards.</li>" +
"</ul>" +
"<p>Primary technologies: C# and VB.NET, WCF, Javascript (Ext JS, jQuery), MS SQL, TFS</p>"
    },
    {
      title: 'Software Quality Engineer',
      company: 'Blackbaud',
      startDate: '2007-06-01',
      endDate: '2010-05-01',
      description: "I developed an automated software UI testing suite tied to continuous integration builds, testing both web and Windows applications. I became responsible for leading and mentoring three other engineers, and participated in planning and prioritizing projects for the team. In my spare time I familiarized myself with Blackbaud’s frameworks and completed software development tasks that enabled me to move into the Software Engineer role."
    },
    {
      title: 'Information Management Leadership Program Intern',
      company: 'General Electric',
      startDate: '2006-06-01',
      endDate: '2006-08-31',
      description: "This internship was focused on IT project management, delivering on a database migration project involving independent contractors."
    },
    {
      title: 'Web Development Intern',
      company: 'WebQuix',
      startDate: '2006-01-01',
      endDate: '2006-05-31',
      description: "I built websites using HTML, CSS, JavaScript and PHP as part of a software startup catering to professional photographers."
    }
  ];

  $scope.education = [
    {
      degree: 'M.S. in Computer Information Systems',
      school: 'Boston University',
      endDate: '2016-05-01',
      description: "" +
"<p>This program was a mix of software development and technology leadership courses that I pursued while working full-time for Wayfair.</p>" +
"<p>Notable courses:</p>" +
"<ul>" +
"  <li>IT Strategy and Management</li>" +
"  <li>Project Management</li>" +
"  <li>Enterprise Architecture</li>" +
"  <li>System Analysis</li>" +
"  <li>Web Application Development with AngularJS</li>" +
"  <li>Database Design</li>" +
"</ul>"
    },
    {
      degree: 'B.S. in Computer Information Systems',
      school: 'Clemson University',
      endDate: '2007-05-01',
      description: "This program was made up primarily of computer science courses, with just a splash of business and management."
    }
  ];
};

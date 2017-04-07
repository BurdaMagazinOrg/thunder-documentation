
#### Documentation is based on following pre-requirements.

- Used operating system: Ubuntu 16.04 (Xenial Xerus) Server
- Domain name used in configurations is ```thunder-install-docs.org```
- A custom user with sudo rights is used documentation. Used username is ```thunder```

#### Creating new user with sudo rights

By default you get logged as ```ubuntu``` user and that user has sudo rights.
To create new user ```thunder``` execute following commands:

```
# sudo adduser thunder
# sudo usermod -aG sudo thunder
```

After that, you can log as ```thunder``` user and continue with next steps of the installation process.

```
# sudo su - thunder
```

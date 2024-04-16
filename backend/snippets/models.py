from django.db import models
from accounts.models import User
from root_app.settings import BASE_SNIPPETS_URL

class Snippet(models.Model):

    owner = models.ForeignKey(User, related_name='snippets', on_delete=models.CASCADE)
    title = models.CharField(max_length=100,blank=True,default='My Code Snippet')
    code = models.TextField()
    language = models.CharField(max_length=15,default='python')
    unique_address = models.CharField(max_length=150,default=BASE_SNIPPETS_URL)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)


    class Meta:
        ordering = ['updatedAt']


    def __str__(self) -> str:
        return f"{self.title}"
from rest_framework import serializers
from .models import User, Email


class EmailSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = Email
        fields = ['id', 'email']
        extra_kwargs = {
            'email': {
                'validators': [],
            },
        }

class UserSerializer(serializers.ModelSerializer):
    email_list = EmailSerializer(many=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'date_joined', 'email_list']

    def create(self, validated_data):
        # Create the book instance
        user = User.objects.create_user(
            id=validated_data['id'],
            username=validated_data['username'],
            password=validated_data['password'],
            date_joined=validated_data['date_joined'],
            email_list=validated_data['email_list'],
        )

        # Create or update each page instance
        # for item in validated_data['email_list']:
        #     email = Page(id=item['page_id'], text=item['text'], book=book)
        #     email.save()

        return user

    def update(self, instance, validated_data):
        # Update the book instance
        instance.username = validated_data['username']
        instance.save()

        # Delete any pages not included in the request
        email_ids = [item['email'] for item in validated_data['email_list']]
        for email in instance.email_list.all():
            if email.email not in email_ids:
                email.delete()

        # Create or update page instances that are in the request
        for item in validated_data['email_list']:
            if 'id' in item:
                email = Email(id=item['id'], email=item['email'], user=instance)
            else:
                email = Email(email=item['email'], user=instance)
            email.save()

        return instance

from django.contrib.auth import get_user_model
from django.db import models


User = get_user_model()


class CityGroup(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True,
    )
    description = models.TextField(
        blank=True,
        null=True,
    )
    owner = models.ForeignKey(
        User,
        related_name="groups_owned",
        on_delete=models.CASCADE,
    )
    members = models.ManyToManyField(
        User,
        related_name="city_groups",
        through="CityGroupMember",
    )

    def __str__(self):
        return self.name


class CityGroupMember(models.Model):
    group = models.ForeignKey(
        CityGroup,
        related_name="user_groups",
        verbose_name="group",
        on_delete=models.CASCADE,
    )
    member = models.ForeignKey(
        User,
        related_name="user_roles",
        verbose_name="member",
        on_delete=models.CASCADE,
    )

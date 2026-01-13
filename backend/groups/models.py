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

    class Meta:
        ordering = ["name",]

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
    joined_on = models.DateTimeField(
        auto_now_add=True,
    )
    is_admin = models.BooleanField(
        default=False,
    )

    class Meta:
        unique_together = ("group", "member",)
        verbose_name = "City Group Membership"

